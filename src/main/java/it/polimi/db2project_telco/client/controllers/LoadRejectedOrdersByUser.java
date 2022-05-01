package it.polimi.db2project_telco.client.controllers;

import it.polimi.db2project_telco.client.util.Accounts;
import it.polimi.db2project_telco.client.util.ServletErrorResponse;
import it.polimi.db2project_telco.server.entities.Order;
import it.polimi.db2project_telco.server.entities.User;
import it.polimi.db2project_telco.server.exceptions.OrderException;
import it.polimi.db2project_telco.server.services.OrderService;

import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.List;

@WebServlet("/LoadRejectedOrdersByUser")
public class LoadRejectedOrdersByUser extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @EJB(name = "it.polimi.db2project_telco.services/OrderService")
    private OrderService orderService;

    public LoadRejectedOrdersByUser() {
        super();
    }

    public void init() throws ServletException {}

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        List<Order> orders;
        int userID = 0;

        // Get the ID of the logged-in user
        try {
            User user = (User) request.getSession().getAttribute(Accounts.USER.value());
            if(user == null)
                throw new OrderException("User requesting the orders and user logged in do not match");
            userID = user.getId();
        } catch (OrderException e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_BAD_REQUEST,
                    e.getMessage());
        }

        // Find the orders
        try {
            orders = orderService.getRejectedOrders(userID);
        } catch(Exception e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    e.getMessage());
            return;
        }

        // Send the package back to the client
        ObjectMapper objectMapper = new ObjectMapper();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        objectMapper.writeValue(response.getWriter(), orders);
    }
}