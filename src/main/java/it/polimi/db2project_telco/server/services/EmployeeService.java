package it.polimi.db2project_telco.server.services;

import it.polimi.db2project_telco.server.entities.Employee;
import it.polimi.db2project_telco.server.exceptions.CredentialsException;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NonUniqueResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;

import java.util.List;

@Stateless
public class EmployeeService {
    @PersistenceContext(unitName = "DB2Project")
    private EntityManager em;

    public EmployeeService() {}

    public Employee checkCredentials(String username, String password)
            throws CredentialsException, NonUniqueResultException {
        List<Employee> employees;

        // Find the user that matches the credentials
        try {
            employees = em.createNamedQuery("Employee.checkCredentials", Employee.class)
                    .setParameter("usr", username)
                    .setParameter("psw", password)
                    .getResultList();
        } catch (PersistenceException e) {
            throw new CredentialsException("Could not verify credentials");
        }

        // Make sure that only one user matches the credentials
        if(employees.size() > 1)
            throw new NonUniqueResultException("Ambiguity in credentials matching");

        return employees.stream().findFirst().orElse(null);
    }
}
