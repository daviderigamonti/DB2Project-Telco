package it.polimi.db2project_telco.client.controllers;

import it.polimi.db2project_telco.client.util.ServletErrorResponse;
import it.polimi.db2project_telco.client.util.Utils;
import it.polimi.db2project_telco.server.entities.Employee;
import it.polimi.db2project_telco.server.entities.User;
import it.polimi.db2project_telco.server.exceptions.CredentialsException;
import it.polimi.db2project_telco.server.services.EmployeeService;
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
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

@WebServlet("/CheckEmployeeLogin")
@MultipartConfig
public class CheckEmployeeLogin extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @EJB(name = "it.polimi.db2project_telco.services/EmployeeService")
    private EmployeeService employeeService;

    public CheckEmployeeLogin() {
        super();
    }

    public void init() throws ServletException {}

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        Employee employee;
        String username, password;
        String passwordHash;

        // Obtain the parameters from the request
        try {
            username = StringEscapeUtils.escapeJava(request.getParameter("username"));
            password = StringEscapeUtils.escapeJava(request.getParameter("password"));

            if (username == null || password == null || username.isEmpty() || password.isEmpty())
                throw new Exception();

            // Hashing the password
            final MessageDigest digest = MessageDigest.getInstance("SHA3-256");
            final byte[] hashByte = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            passwordHash = Utils.bytesToHexString(hashByte);

        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Incomplete or malformed credentials");
            return;
        }

        // Check the credentials for the employee
        try {
            employee = employeeService.checkCredentials(username, passwordHash);
            if (employee == null)
                throw new CredentialsException("Wrong credentials");
        } catch (CredentialsException | NonUniqueResultException e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_FORBIDDEN,
                    e.getMessage());
            return;
        } catch (Exception e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_CONFLICT,
                    "Error during login procedure");
            return;
        }

        // Save the user data in the session
        request.getSession().setAttribute("employee", employee);

        // Send the user data back to the client
        ObjectMapper objectMapper = new ObjectMapper();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        objectMapper.writeValue(response.getWriter(), employee);

    }
}