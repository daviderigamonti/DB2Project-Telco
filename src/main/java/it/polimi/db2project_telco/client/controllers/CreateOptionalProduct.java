package it.polimi.db2project_telco.client.controllers;

import it.polimi.db2project_telco.client.util.ServletErrorResponse;
import it.polimi.db2project_telco.server.services.OptionalProductService;

import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.apache.commons.text.StringEscapeUtils;

import java.io.IOException;

@WebServlet("/CreateOptionalProduct")
@MultipartConfig
public class CreateOptionalProduct extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @EJB(name = "it.polimi.db2project_telco.services/OptionalProductService")
    private OptionalProductService optionalProductService;

    public CreateOptionalProduct() {
        super();
    }

    public void init() throws ServletException {}

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        String name;
        float fee;

        // Obtain the parameters from the request
        try {
            name = StringEscapeUtils.escapeJava(request.getParameter("optionalProductName"));
            String feeString = StringEscapeUtils.escapeJava(request.getParameter("optionalProductFee"));

            if(name == null || name.isEmpty() ||
                    feeString == null || feeString.isEmpty())
                throw new Exception();

            fee = Float.parseFloat(feeString);
        } catch (Exception e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_BAD_REQUEST,
                    "Incomplete or malformed parameters");
            return;
        }

        // Create the new product using the given preferences
        try {
            optionalProductService.createProduct(name, fee);
        } catch (Exception e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Impossible to create an optional product with the given features");
            return;
        }

        response.setStatus(HttpServletResponse.SC_OK);
    }

}
