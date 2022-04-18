package it.polimi.db2project_telco.server.services;

import it.polimi.db2project_telco.server.entities.ServicePackage;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.List;

@Stateless
public class ServicePackageService {
    @PersistenceContext(unitName = "DB2Project")
    private EntityManager em;

    public ServicePackageService() {}

    public List<ServicePackage> findAll() {
        return em.createNamedQuery("ServicePackage.findAll", ServicePackage.class).getResultList();
    }

    @SuppressWarnings("ResultOfMethodCallIgnored")
    public ServicePackage findByID(int packageID) {
        ServicePackage pkg = em.find(ServicePackage.class, packageID);

        // Wake up the lazy entities
        if(pkg != null) {
            pkg.getOptionalProducts().size();
            pkg.getValidityPeriods().size();
        }

        return pkg;
    }

    public void createServicePackage(ServicePackage servicePackage) {
        em.persist(servicePackage);
    }
}