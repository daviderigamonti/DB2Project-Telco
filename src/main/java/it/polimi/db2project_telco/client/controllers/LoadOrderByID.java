package it.polimi.db2project_telco.client.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.apache.commons.text.StringEscapeUtils;

import java.io.IOException;

@WebServlet("/LoadOrderByID")
public class LoadOrderByID extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @EJB(name = "it.polimi.db2project_telco.services/OrderService")
    private OrderService orderService;

    public LoadOrderByID() {
        super();
    }

    public void init() throws ServletException {}

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        Order order;
        int userID;

        // Obtain the parameters from the request
        try {
            String temp = StringEscapeUtils.escapeJava(request.getParameter("orderID"));

            if(temp == null || temp.isEmpty())
                throw new Exception();

            userID = Integer.parseInt(temp);
        } catch (Exception e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_BAD_REQUEST,
                    "Malformed input request");
            return;
        }

        // Find the order
        try {
            order = orderService.findByID(userID);
        } catch(Exception e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_BAD_REQUEST,
                    e.getMessage());
            return;
        }

        // Check that the user requesting the order owns the order
        try {
            if(((User) request.getSession().getAttribute("user")).getId() != order.getUser().getId())
                throw  new OrderException("Requesting user doesn't own the order");
        } catch(Exception e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
            return;
        }

        // Send the package back to the client
        ObjectMapper objectMapper = new ObjectMapper();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        objectMapper.writeValue(response.getWriter(), order);
    }
}