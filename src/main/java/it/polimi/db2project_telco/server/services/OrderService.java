package it.polimi.db2project_telco.server.services;

import it.polimi.db2project_telco.server.entities.*;
import it.polimi.db2project_telco.server.exceptions.OrderException;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Stateless
public class OrderService {
    @PersistenceContext(unitName = "DB2Project")
    private EntityManager em;

    public OrderService() {}

    public Order composeOrder(int servicePackageID, int validityPeriodID,
                                    List<Integer> optionalProductsIDs) {
        Order order = new Order();

        order.setServicePackage(em.find(ServicePackage.class, servicePackageID));
        order.setValidityPeriod(em.find(ValidityPeriod.class, validityPeriodID));

        // Find all the optional products using the IDs contained in the list
        List<OptionalProduct> optionalProducts = optionalProductsIDs.stream()
                .map(id -> em.find(OptionalProduct.class, id)).collect(Collectors.toList());
        order.setOptionalProducts(optionalProducts);

        return order;   // The order isn't persisted inside the database
    }

    public Order insertNewOrder(Order trackedOrder) {

        Order order = new Order();

        // TODO: can we do it better?
        // Set the parameters based on the references took from the database
        order.setUser(em.getReference(User.class, trackedOrder.getUser().getId()));
        order.setServicePackage(em.getReference(ServicePackage.class, trackedOrder.getServicePackage().getId()));
        order.setValidityPeriod(em.getReference(ValidityPeriod.class, trackedOrder.getValidityPeriod().getId()));
        order.setOptionalProducts(trackedOrder.getOptionalProducts()
                .stream()
                .map(p -> em.getReference(OptionalProduct.class, p.getId()))
                .collect(Collectors.toList()));
        // The order is given pending status and the current creation time
        order.setStatus("Pending"); //TODO: substitute order status with enum
        order.setTimestamp(new Timestamp(System.currentTimeMillis()));
        order.setTotal(0.0f);   //TODO: set total during order creation

        em.persist(order);

        return order;
    }

    public void updateOrderStatus(Order order, boolean payment) {

        if(payment) {
            order.setStatus("Valid"); //TODO: substitute order status with enum
            order.setActivationDate(new Timestamp(System.currentTimeMillis()));
        }
        else
            order.setStatus("Failed");

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
            throw new OrderException("Could not verify credentials");
        }

        // Wake up the lazy entities
        orders.forEach(Order::getServicePackage);

        // TODO: in general we have the user object inside every entity we return (which contains the password), maybe use LAZY retrieval?

        return orders;
    }
}