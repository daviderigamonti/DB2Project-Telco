package it.polimi.db2project_telco.server.services;

import it.polimi.db2project_telco.server.entities.OptionalProduct;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.List;

@Stateless
public class OptionalProductService {
    @PersistenceContext(unitName = "DB2Project")
    private EntityManager em;

    public OptionalProductService() {}

    public List<OptionalProduct> findAll() {
        return em.createNamedQuery("OptionalProduct.findAll", OptionalProduct.class).getResultList();
    }

    public void createProduct(String name, float fee) {
        OptionalProduct product = new OptionalProduct(name, fee);
        em.persist(product);
    }
}