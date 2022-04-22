package it.polimi.db2project_telco.client.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import it.polimi.db2project_telco.client.util.ServletErrorResponse;
import it.polimi.db2project_telco.server.services.SalesReportService;
import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet("/LoadSalesReport")
public class LoadSalesReport extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @EJB(name = "it.polimi.db2project_telco.services/SalesReportService")
    private SalesReportService salesReportService;

    public LoadSalesReport() {
        super();
    }

    public void init() throws ServletException {}

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        Map<String, List<? extends Serializable>> salesReport = new HashMap<>();

        // Find the report elements
        try {
            // TODO: enum for map entries?
            // TODO: rejected orders -> suspended orders?
            salesReport.put("PurchasesPerPackage", salesReportService.findPurchasesPerPackage());
            salesReport.put("PurchasesPerPackagePeriod", salesReportService.findPurchasesPerPackagePeriod());
            salesReport.put("TotalPerPackage", salesReportService.findTotalPerPackage());
            salesReport.put("AvgOptPerPackage", salesReportService.findAvgOptPerPackage());
            salesReport.put("InsolventUsers", salesReportService.findInsolventUsers());
            salesReport.put("RejectedOrders", salesReportService.findRejectedOrders());
            salesReport.put("Audits", salesReportService.findAudits());
            salesReport.put("BestSellerOptional", salesReportService.findBestSellerOptional());
        } catch(Exception e) {
            ServletErrorResponse.createResponse(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Could not retrieve report elements");
            return;
        }

        // Send the packages back to the client
        ObjectMapper objectMapper = new ObjectMapper();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        objectMapper.writeValue(response.getWriter(), salesReport);
    }
}