package it.polimi.db2project_telco.server.services;

import it.polimi.db2project_telco.server.entities.*;
import it.polimi.db2project_telco.server.entities.util.OrderStatus;
import it.polimi.db2project_telco.server.exceptions.OrderException;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

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
                                    List<Integer> optionalProductsIDs) {
        Order order = new Order();

        ServicePackage servicePackage = em.find(ServicePackage.class, servicePackageID);
        ValidityPeriod validityPeriod = em.find(ValidityPeriod.class, validityPeriodID);

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

    public void updateOrderStatus(Order order, OrderStatus status) {

        order.setStatus(status);

        if(status == OrderStatus.VALID)
            order.setActivationDate(new Timestamp(System.currentTimeMillis()));

        em.merge(order);
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
        if(orders != null)
            orders.forEach(Order::getServicePackage);

        return orders;
    }
}