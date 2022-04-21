package it.polimi.db2project_telco.server.services;

import it.polimi.db2project_telco.server.entities.User;
import it.polimi.db2project_telco.server.exceptions.CredentialsException;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NonUniqueResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;

import java.util.List;

@Stateless
public class UserService {
    @PersistenceContext(unitName = "DB2Project")
    private EntityManager em;

    public UserService() {}

    public User checkCredentials(String username, String password)
            throws CredentialsException, NonUniqueResultException {
        List<User> users;

        // Find the user that matches the credentials
        try {
            users = em.createNamedQuery("User.findByUsername", User.class)
                    .setParameter("usr", username)
                    .getResultList();
        } catch (PersistenceException e) {
            throw new CredentialsException("Could not find user");
        }

        // Make sure that only one user matches the credentials
        if(users.size() > 1)
            throw new NonUniqueResultException("Ambiguity in credentials matching");

        // Check that the password is correct (this is done here and not as a separate query
        // in order to make a case-sensitive comparison in an easier way)
        User user = users.stream().findFirst().orElse(null);
        if(user == null || !user.getPassword().equals(password))
            throw new CredentialsException("Incorrect password");

        return user;
    }

    public void createUser(String mail, String username, String password) {
        User user = new User(mail, username, password);
        em.persist(user);
    }
}