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
            employees = em.createNamedQuery("Employee.findByUsername", Employee.class)
                    .setParameter("usr", username)
                    .getResultList();
        } catch (PersistenceException e) {
            throw new CredentialsException("Could not find employee");
        }

        // Make sure that only one user matches the credentials
        if(employees.size() > 1)
            throw new CredentialsException("Ambiguity in credentials matching");

        // Check that the password is correct (this is done here and not as a separate query
        // in order to make a case-sensitive comparison in an easier way)
        Employee employee = employees.stream().findFirst().orElse(null);
        if(employee == null || !employee.getPassword().equals(password))
            throw new NonUniqueResultException("Incorrect password");

        return employee;
    }
}
