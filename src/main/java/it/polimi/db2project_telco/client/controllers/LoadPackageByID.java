package it.polimi.db2project_telco.client.controllers;

import it.polimi.db2project_telco.client.util.ServletErrorResponse;
import it.polimi.db2project_telco.server.entities.ServicePackage;
import it.polimi.db2project_telco.server.services.ServicePackageService;

import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.apache.commons.text.StringEscapeUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

@WebServlet("/LoadPackageByID")
public class LoadPackageByID extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @EJB(name = "it.polimi.db2project_telco.services/ServicePackageService")
    private ServicePackageService servicePackageService;

    public LoadPackageByID() {
        super();
    }

    public void init() throws ServletException {}

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        ServicePackage pkg;
        int packageID;

        // Obtain the parameters from the request
        try {
            String temp = StringEscapeUtils.escapeJava(request.getParameter("id"));

            if(temp == null || temp.isEmpty())
                throw new Exception();

            packageID = Integer.parseInt(temp);
        } catch (Exception e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_BAD_REQUEST,
                    "Malformed input request");
            return;
        }

        // Find the package
        try {
            pkg = servicePackageService.findByID(packageID);
        } catch(Exception e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Could not retrieve the package");
            return;
        }

        // Send the package back to the client
        ObjectMapper objectMapper = new ObjectMapper();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        objectMapper.writeValue(response.getWriter(), pkg);
    }
}