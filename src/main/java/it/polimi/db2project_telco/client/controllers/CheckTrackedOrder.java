package it.polimi.db2project_telco.client.controllers;

import it.polimi.db2project_telco.client.util.Accounts;
import it.polimi.db2project_telco.client.util.ServletErrorResponse;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.apache.commons.text.StringEscapeUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

@WebServlet("/CheckTrackedOrder")
public class CheckTrackedOrder extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public CheckTrackedOrder() {
        super();
    }

    public void init() throws ServletException {}

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        HttpSession session = request.getSession();

        boolean delete = false;

        // Obtain the parameters from the request
        try {
            String deleteString = StringEscapeUtils.escapeJava(request.getParameter("delete"));

            if(deleteString != null && !deleteString.isEmpty())
                delete = Boolean.parseBoolean(deleteString);

        } catch (Exception e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_BAD_REQUEST,
                    "Incomplete or malformed parameters");
            return;
        }

        // Retrieve the user and the tracked order and check if they are null
        boolean result = session.getAttribute(Accounts.USER.value()) != null && session.getAttribute("trackedOrder") != null;

        // If the delete parameter is set as true and a tracked order exists, then delete it
        if(delete && result) {
            session.removeAttribute("trackedOrder");
            result = false;
        }

        // Send the package back to the client
        ObjectMapper objectMapper = new ObjectMapper();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        objectMapper.writeValue(response.getWriter(), result);
    }
}