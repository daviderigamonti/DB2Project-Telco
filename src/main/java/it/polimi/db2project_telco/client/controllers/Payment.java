package it.polimi.db2project_telco.client.controllers;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/Payment")
public class Payment extends HttpServlet {
    private static final long serialVersionUID = 1L;
    //@EJB(name = "it.polimi.db2project_telco.services/OrderService")
    //private OrderService orderService;
    //@EJB(name = "it.polimi.db2project_telco.services/AuditService")
    //private AuditService auditService;
    //@EJB(name = "it.polimi.db2project_telco.services/ScheduleService")
    //private ScheduleService scheduleService;

    public Payment() {
        super();
    }

    public void init() throws ServletException {}

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //TODO: Payment
    }
}