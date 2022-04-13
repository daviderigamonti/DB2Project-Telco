package it.polimi.db2project_telco.client.controllers;

import it.polimi.db2project_telco.client.util.ServletErrorResponse;
import it.polimi.db2project_telco.server.services.UserService;

import jakarta.ejb.EJB;
import jakarta.persistence.EntityExistsException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.apache.commons.text.StringEscapeUtils;

import java.io.IOException;

@WebServlet("/RegisterUser")
@MultipartConfig
public class RegisterUser extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @EJB(name = "it.polimi.db2project_telco.services/UserService")
    private UserService userService;

    public RegisterUser() {
        super();
    }

    public void init() throws ServletException {}

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        String mail, username, password;

        // Obtain the parameters from the request
        try {
            mail = StringEscapeUtils.escapeJava(request.getParameter("mail"));
            username = StringEscapeUtils.escapeJava(request.getParameter("username"));
            password = StringEscapeUtils.escapeJava(request.getParameter("password"));
            if(mail == null || username == null || password == null ||
                    mail.isEmpty() || username.isEmpty() || password.isEmpty())
                throw new Exception();
        } catch (Exception e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_BAD_REQUEST,
                    "Incomplete or malformed registration credentials");
            return;
        }

        // Create the new user
        try {
            userService.createUser(mail, username, password);
        } catch(EntityExistsException e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_BAD_REQUEST,
                    "Username already registered");
            return;
        } catch(Exception e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_BAD_REQUEST,
                    "Error during registration procedure");
            return;
        }

        response.setStatus(HttpServletResponse.SC_OK);
    }
}