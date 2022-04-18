package it.polimi.db2project_telco.client.controllers;

import it.polimi.db2project_telco.client.util.ServletErrorResponse;
import it.polimi.db2project_telco.server.entities.*;
import it.polimi.db2project_telco.server.services.ServicePackageService;

import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

@WebServlet("/CreateServicePackage")
@MultipartConfig
public class CreateServicePackage extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @EJB(name = "it.polimi.db2project_telco.services/ServicePackageService")
    private ServicePackageService servicePackageService;

    public CreateServicePackage() {
        super();
    }

    public void init() throws ServletException {}

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        ObjectMapper mapper = new ObjectMapper();

        ServicePackage servicePackage;

        // Obtain the parameters from the request
        try {
            String jsonInput = request.getReader().readLine();
            servicePackage = mapper.readValue(jsonInput, ServicePackage.class);
            if(servicePackage == null)
                throw new Exception();
        } catch (Exception e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_BAD_REQUEST,
                    "Incomplete or malformed parameters");
            return;
        }

        // Check for incomplete service packages
        try {
            if(servicePackage.getFixedPhoneServices() == null ||
                    servicePackage.getMobilePhoneServices() == null ||
                    servicePackage.getInternetServices() == null ||
                    servicePackage.getValidityPeriods() == null ||
                    servicePackage.getValidityPeriods().isEmpty() ||
                    (servicePackage.getFixedPhoneServices().isEmpty() &&
                            servicePackage.getMobilePhoneServices().isEmpty() &&
                            servicePackage.getInternetServices().isEmpty()
                    ))
                throw new Exception();
        } catch(Exception e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_BAD_REQUEST,
                    "Incomplete service package definition");
            return;
        }

        // Create the new service package using the given preferences
        try {
            servicePackageService.createServicePackage(servicePackage);
        } catch (Exception e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Impossible to create a service package with the given features");
            return;
        }

        response.setStatus(HttpServletResponse.SC_OK);
    }

}

