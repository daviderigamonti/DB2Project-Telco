package it.polimi.db2project_telco.client.controllers;

import it.polimi.db2project_telco.client.util.ServletErrorResponse;
import it.polimi.db2project_telco.server.entities.Order;
import it.polimi.db2project_telco.server.services.OrderService;

import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.apache.commons.text.StringEscapeUtils;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@WebServlet("/CreateOrder")
@MultipartConfig
public class CreateOrder extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @EJB(name = "it.polimi.db2project_telco.services/OrderService")
    private OrderService orderService;

    public CreateOrder() {
        super();
    }

    public void init() throws ServletException {}

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        Order order;
        int servicePackageID, validityPeriodID;
        List<Integer> optionalProductsIDs;

        // Obtain the parameters from the request
        try {
            String servicePackage = StringEscapeUtils.escapeJava(request.getParameter("servicePackage"));
            String validityPeriod = StringEscapeUtils.escapeJava(request.getParameter("validityPeriod"));
            String[] tempProducts = Optional.ofNullable(request.getParameterValues("optionalProducts"))
                    .orElse(new String[0]); // Check for null parameter and substitute it with empty array
            List<String> optionalProducts = Arrays.stream(tempProducts)
                    .map(StringEscapeUtils::escapeJava).collect(Collectors.toList());

            if(servicePackage == null || servicePackage.isEmpty() ||
                    validityPeriod == null || validityPeriod.isEmpty() ||
                        optionalProducts.stream().anyMatch(String::isEmpty))
                throw new Exception();

            servicePackageID = Integer.parseInt(servicePackage);
            validityPeriodID = Integer.parseInt(validityPeriod);
            optionalProductsIDs = optionalProducts.stream().map(Integer::parseInt).collect(Collectors.toList());
        } catch (Exception e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_BAD_REQUEST,
                    "Incomplete or malformed parameters");
            return;
        }

        // Compose the order using the given preferences
        try {
            order = orderService.composeOrder(servicePackageID, validityPeriodID, optionalProductsIDs);
        } catch (Exception e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Impossible to create an order with the given features");
            return;
        }

        // Save the tracked order in the session
        request.getSession().setAttribute("trackedOrder", order);

        response.setStatus(HttpServletResponse.SC_OK);
    }
}