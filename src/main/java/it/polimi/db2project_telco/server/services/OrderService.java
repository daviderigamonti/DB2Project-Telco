package it.polimi.db2project_telco.server.services;

import it.polimi.db2project_telco.client.util.PaymentService;
import it.polimi.db2project_telco.client.util.PaymentTest;
import it.polimi.db2project_telco.server.entities.*;
import it.polimi.db2project_telco.server.entities.util.OrderStatus;
import it.polimi.db2project_telco.server.exceptions.OrderException;

import it.polimi.db2project_telco.server.exceptions.PaymentException;
import it.polimi.db2project_telco.server.exceptions.UserException;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

import static it.polimi.db2project_telco.server.entities.util.OrderStatus.fromOutcome;

@Stateless
public class OrderService {
    @PersistenceContext(unitName = "DB2Project")
    private EntityManager em;

    public OrderService() {}

    @SuppressWarnings("ResultOfMethodCallIgnored")
    public Order findByID(int orderID) {
        Order order = em.find(Order.class, orderID);

        // Wake up the lazy entities
        if(order != null) {
            order.getServicePackage();
            order.getOptionalProducts().size();
        }

        return order;
    }

    public Order composeOrder(int servicePackageID, int validityPeriodID,
                                    List<Integer> optionalProductsIDs) throws OrderException {
        Order order = new Order();

        ServicePackage servicePackage = em.find(ServicePackage.class, servicePackageID);
        List<Integer> offeredOptionalIDs = servicePackage.getOptionalProducts().stream()
                .map(OptionalProduct::getId).collect(Collectors.toList());
        ValidityPeriod validityPeriod = em.find(ValidityPeriod.class, validityPeriodID);
        List<Integer> offeredValidityIDs = servicePackage.getValidityPeriods().stream()
                .map(ValidityPeriod::getId).collect(Collectors.toList());

        // Check if every optional product and validity period can be applied to the service package
        if(!offeredOptionalIDs.containsAll(optionalProductsIDs) || !offeredValidityIDs.contains(validityPeriod.getId()))
            throw new OrderException("Invalid optional products or validity period");

        // Find all the optional products using the IDs contained in the list
        List<OptionalProduct> optionalProducts = optionalProductsIDs.stream()
                .map(id -> em.find(OptionalProduct.class, id)).collect(Collectors.toList());

        // Calculate the total and convert it to float
        int months = validityPeriod.getMonths();
        double totalDouble = validityPeriod.getFee() * months +
                optionalProducts.stream().mapToDouble(OptionalProduct::getFee).sum() * months;
        float total = new BigDecimal(totalDouble).setScale(2, RoundingMode.HALF_UP).floatValue();

        order.setServicePackage(servicePackage);
        order.setValidityPeriod(validityPeriod);
        order.setOptionalProducts(optionalProducts);
        order.setTotal(total);

        return order;   // The order isn't persisted inside the database
    }

    public Order insertNewOrder(Order trackedOrder) {

        Order order = new Order();

        // Set the parameters based on the references took from the database
        order.setUser(em.getReference(User.class, trackedOrder.getUser().getId()));
        order.setServicePackage(em.getReference(ServicePackage.class, trackedOrder.getServicePackage().getId()));
        order.setValidityPeriod(em.getReference(ValidityPeriod.class, trackedOrder.getValidityPeriod().getId()));
        order.setOptionalProducts(trackedOrder.getOptionalProducts()
                .stream()
                .map(p -> em.getReference(OptionalProduct.class, p.getId()))
                .collect(Collectors.toList()));
        // The order is given pending status, the current creation time as a timestamp and the total
        // calculated in advance
        order.setStatus(OrderStatus.PENDING);
        order.setTimestamp(new Timestamp(System.currentTimeMillis()));
        order.setTotal(trackedOrder.getTotal());

        em.persist(order);

        return order;
    }

    public void updateOrderStatus(Order order, OrderStatus status) throws OrderException {

        order.setStatus(status);

        if(status == OrderStatus.VALID)
            order.setActivationDate(new Timestamp(System.currentTimeMillis()));

        try {
            em.merge(order);
        } catch(Exception e) {
            throw new OrderException("Impossible to change status of the order");
        }
    }

    public boolean payment(Order trackedOrder, User user, PaymentTest testOutcome)
            throws UserException, OrderException {

        boolean outcome;

        // Check if the order already exists by controlling the trackedOrder's ID
        Order existingOrder = findByID(trackedOrder.getId());
        if(existingOrder == null) {

            // Connect the order and the user
            trackedOrder.setUser(user);

            // Forward order to the database
            try {
                trackedOrder = insertNewOrder(trackedOrder);
            } catch (Exception e) {
                throw new OrderException("Error while generating the order");
            }
        }
        else {

            // Check that the user requesting the order owns the order
            if(user.getId() != trackedOrder.getUser().getId())
                throw new UserException("Requesting user doesn't own the order");

            // Set the order (already present in the DB) as PENDING for the upcoming payment operation
            updateOrderStatus(trackedOrder, OrderStatus.PENDING);
        }

        // Payment operation
        try {
            outcome = PaymentService.paymentOperation(testOutcome, 1000);
        } catch(PaymentException e) {
            outcome = false;
        }

        // Update the status of the order
        updateOrderStatus(trackedOrder, fromOutcome(outcome));

        return outcome;
    }

    @SuppressWarnings("ResultOfMethodCallIgnored")
    public List<Order> getRejectedOrders(int userID) throws OrderException {

        List<Order> orders;

        try {
            orders = em.createNamedQuery("Order.getRejectedOrdersByUser", Order.class)
                    .setParameter("id", userID)
                    .getResultList();
        } catch(PersistenceException e) {
            throw new OrderException("Error while retrieving orders");
        }

        // Wake up the lazy entities
        if(orders != null) {
            orders.forEach(Order::getServicePackage);
            orders.forEach(Order::getValidityPeriod);
        }

        return orders;
    }
}