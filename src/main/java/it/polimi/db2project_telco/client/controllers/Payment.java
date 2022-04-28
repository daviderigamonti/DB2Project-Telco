package it.polimi.db2project_telco.client.controllers;

import static it.polimi.db2project_telco.server.entities.util.OrderStatus.fromOutcome;

import it.polimi.db2project_telco.client.util.PaymentService;
import it.polimi.db2project_telco.client.util.PaymentTest;
import it.polimi.db2project_telco.client.util.ServletErrorResponse;
import it.polimi.db2project_telco.server.entities.Order;
import it.polimi.db2project_telco.server.entities.User;
import it.polimi.db2project_telco.server.entities.util.OrderStatus;
import it.polimi.db2project_telco.server.exceptions.OrderException;
import it.polimi.db2project_telco.server.exceptions.PaymentException;
import it.polimi.db2project_telco.server.exceptions.UserException;
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

    public Payment() {
        super();
    }

    public void init() throws ServletException {}

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        PaymentTest testOutcome = PaymentTest.RANDOM;
        boolean outcome = false;
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
                else if(testOutcomeString.equals("failure"))
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

        /* Execute the payment operation by:
         *      - check if the order exists, if so put it in the PENDING state and check if the user owns the order,
         *          otherwise create a new order
         *      - call the external payment service
         *      - update the order status depending on the payment's outcome
         */
        try {
            outcome = orderService.payment(order, user, testOutcome);
        } catch(UserException e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_FORBIDDEN, e.getMessage());
        }
        catch(OrderException e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, e.getMessage());
        }

        // Remove the tracked order from the session
        request.getSession().removeAttribute("trackedOrder");

        ObjectMapper objectMapper = new ObjectMapper();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        objectMapper.writeValue(response.getWriter(), outcome);
    }
}