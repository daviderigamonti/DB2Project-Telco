package it.polimi.db2project_telco.server.services;

import it.polimi.db2project_telco.server.entities.OptionalProduct;
import it.polimi.db2project_telco.server.entities.Order;
import it.polimi.db2project_telco.server.entities.ServicePackage;
import it.polimi.db2project_telco.server.entities.ValidityPeriod;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

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
}