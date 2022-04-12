package it.polimi.db2project_telco.client.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import it.polimi.db2project_telco.server.entities.Order;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/LoadTrackedOrder")
@MultipartConfig
public class LoadTrackedOrder extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public LoadTrackedOrder() {
        super();
    }

    public void init() throws ServletException {}

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        Order order;

        // Obtain the order from the session
        try {
            order = (Order)request.getSession().getAttribute("trackedOrder");
            if(order == null)
                throw new Exception();
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Impossible to retrieve the tracked order");
            return;
        }

        // Send the order back to the client
        ObjectMapper objectMapper = new ObjectMapper();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        objectMapper.writeValue(response.getWriter(), order);
    }
}