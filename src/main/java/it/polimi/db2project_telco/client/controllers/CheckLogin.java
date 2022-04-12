package it.polimi.db2project_telco.client.controllers;

import it.polimi.db2project_telco.server.entities.User;
import it.polimi.db2project_telco.server.exceptions.CredentialsException;
import it.polimi.db2project_telco.server.services.UserService;

import jakarta.ejb.EJB;
import jakarta.persistence.NonUniqueResultException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.commons.text.StringEscapeUtils;

import java.io.IOException;

@WebServlet("/CheckLogin")
@MultipartConfig
public class CheckLogin extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @EJB(name = "it.polimi.db2project_telco.services/UserService")
    private UserService userService;

    public CheckLogin() {
        super();
    }

    public void init() throws ServletException {}

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        User user;
        String username, password;

        // Obtain the parameters from the request
        try {
            username = StringEscapeUtils.escapeJava(request.getParameter("username"));
            password = StringEscapeUtils.escapeJava(request.getParameter("password"));
            if(username == null || password == null || username.isEmpty() || password.isEmpty())
                throw new Exception();
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Incomplete or malformed credentials");
            return;
        }

        // Check the credentials for the user
        try {
            user = userService.checkCredentials(username, password);
            if(user == null)
                throw new CredentialsException("Wrong credentials");
        } catch(CredentialsException | NonUniqueResultException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
            return;
        } catch(Exception e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error during login procedure");
            return;
        }

        // Save the user data in the session
        user.setPassword("");   // Shouldn't be tracked by the em
        request.getSession().setAttribute("user", user);

        // Send the user data back to the client
        ObjectMapper objectMapper = new ObjectMapper();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        objectMapper.writeValue(response.getWriter(), user);    //TODO: It would probably be better to just pass the name + id
    }
}