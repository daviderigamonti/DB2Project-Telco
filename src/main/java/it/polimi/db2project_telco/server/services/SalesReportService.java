package it.polimi.db2project_telco.server.services;

import it.polimi.db2project_telco.server.entities.Audit;
import it.polimi.db2project_telco.server.entities.materialized.*;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NonUniqueResultException;
import jakarta.persistence.PersistenceContext;

import java.util.List;

@Stateless
public class SalesReportService {
    @PersistenceContext(unitName = "DB2Project")
    private EntityManager em;

    public SalesReportService() {}

    public List<PurchasesPerPackage> findPurchasesPerPackage() {
        return em.createNamedQuery("PurchasesPerPackage.findAll", PurchasesPerPackage.class).getResultList();
    }

    public List<PurchasesPerPackagePeriod> findPurchasesPerPackagePeriod() {
        return em.createNamedQuery("PurchasesPerPackagePeriod.findAll", PurchasesPerPackagePeriod.class)
                .getResultList();
    }

    public List<TotalPerPackage> findTotalPerPackage() {
        return em.createNamedQuery("TotalPerPackage.findAll", TotalPerPackage.class).getResultList();
    }

    public List<AvgOptPerPackage> findAvgOptPerPackage() {
        return em.createNamedQuery("AvgOptPerPackage.findAll", AvgOptPerPackage.class).getResultList();
    }

    public List<InsolventUsers> findInsolventUsers() {
        return em.createNamedQuery("InsolventUsers.findAll", InsolventUsers.class).getResultList();
    }

    public List<SuspendedOrders> findSuspendedOrders() {
        return em.createNamedQuery("SuspendedOrders.findAll", SuspendedOrders.class).getResultList();
    }

    public List<Audit> findAudits() {
        return em.createNamedQuery("Audit.findAll", Audit.class).getResultList();
    }

    public List<BestSellerOptional> findBestSellerOptional() {
        List<BestSellerOptional> bestSellers =
                em.createNamedQuery("BestSellerOptional.findAll", BestSellerOptional.class).getResultList();

        // Make sure that there is only one bestseller
        if(bestSellers.size() > 1)
            throw new NonUniqueResultException("Ambiguity in retrieving data");

        // Return the whole list for easier handling
        return bestSellers;
    }
}
