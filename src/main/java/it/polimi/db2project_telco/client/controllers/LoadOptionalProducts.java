package it.polimi.db2project_telco.client.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import it.polimi.db2project_telco.client.util.ServletErrorResponse;
import it.polimi.db2project_telco.server.entities.OptionalProduct;
import it.polimi.db2project_telco.server.entities.ServicePackage;
import it.polimi.db2project_telco.server.services.OptionalProductService;
import it.polimi.db2project_telco.server.services.ServicePackageService;
import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/LoadOptionalProducts")
public class LoadOptionalProducts extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @EJB(name = "it.polimi.db2project_telco.services/OptionalProductService")
    private OptionalProductService optionalProductService;

    public LoadOptionalProducts() {
        super();
    }

    public void init() throws ServletException {}

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        List<OptionalProduct> products;

        // Find the products
        try {
            products = optionalProductService.findAll();
        } catch(Exception e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Could not retrieve optional products");
            return;
        }

        // Send the packages back to the client
        ObjectMapper objectMapper = new ObjectMapper();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        objectMapper.writeValue(response.getWriter(), products);
    }
}