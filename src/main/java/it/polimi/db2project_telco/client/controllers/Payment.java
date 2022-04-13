package it.polimi.db2project_telco.client.controllers;

import it.polimi.db2project_telco.client.util.PaymentService;
import it.polimi.db2project_telco.client.util.PaymentTest;
import it.polimi.db2project_telco.client.util.ServletErrorResponse;
import it.polimi.db2project_telco.server.entities.Order;
import it.polimi.db2project_telco.server.entities.User;
import it.polimi.db2project_telco.server.exceptions.PaymentException;
import it.polimi.db2project_telco.server.services.OrderService;

import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.apache.commons.text.StringEscapeUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

@WebServlet("/Payment")
@MultipartConfig
public class Payment extends HttpServlet {
    private static final long serialVersionUID = 1L;
    @EJB(name = "it.polimi.db2project_telco.services/OrderService")
    private OrderService orderService;
    //@EJB(name = "it.polimi.db2project_telco.services/AuditService")
    //private AuditService auditService;
    //@EJB(name = "it.polimi.db2project_telco.services/ScheduleService")
    //private ScheduleService scheduleService;

    public Payment() {
        super();
    }

    public void init() throws ServletException {}

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        PaymentTest testOutcome = PaymentTest.RANDOM;
        boolean outcome;
        Order order;
        User user;

        // Obtain the parameters from the request
        try {
            /* Possibility to manipulate the outcome for testing reasons.
             * If the outcome parameter in the request is set to "fail" the payment will always fail, if it's
             * set to "success" it will always succeed, otherwise there is a random chance of either failing
             * or succeeding
             */
            String testOutcomeString = StringEscapeUtils.escapeJava(request.getParameter("outcome"));
            if(testOutcomeString != null && !testOutcomeString.isEmpty()) {
                if(testOutcomeString.equals("success"))
                    testOutcome = PaymentTest.SUCCESS;
                else if(testOutcomeString.equals("fail"))
                    testOutcome = PaymentTest.FAILURE;
            }
        } catch(Exception e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_BAD_REQUEST,
                    "Incomplete or malformed parameters");
            return;
        }

        // Retrieve the order and the user from the session
        try {
            user = (User) request.getSession().getAttribute("user");
            order = (Order) request.getSession().getAttribute("trackedOrder");
            if(order == null || user == null)
                throw new Exception();
        } catch(Exception e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_BAD_REQUEST,
                    "Error while retrieving data from the session");
            return;
        }

        // Connect the order and the user
        order.setUser(user);

        // Forward order to the database
        try {
            order = orderService.insertNewOrder(order);
        } catch(Exception e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_BAD_REQUEST,
                    "Error while generating the order");
            return;
        }

        // TODO: remove the order from the tracked order

        // Payment operation
        try {
            outcome = PaymentService.paymentOperation(testOutcome, 1000);
        } catch(PaymentException e) {
            outcome = false;
        }

        // Update the status of the order
        try {
            orderService.updateOrderStatus(order, outcome);
        } catch(Exception e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_BAD_REQUEST,
                    "Error while generating the order");    // TODO: if this fails here we have a really big problem! The previous transaction is not rolled back
            return;
        }

        // TODO: eventually track the user in the audit (maybe done in DB via triggers)

        ObjectMapper objectMapper = new ObjectMapper();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        objectMapper.writeValue(response.getWriter(), outcome);
    }
}