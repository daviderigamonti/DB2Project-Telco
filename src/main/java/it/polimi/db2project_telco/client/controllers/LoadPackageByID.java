package it.polimi.db2project_telco.client.controllers;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/LoadPackageByID")
public class LoadPackageByID extends HttpServlet {
    private static final long serialVersionUID = 1L;
    //@EJB(name = "it.polimi.db2project_telco.services/ServicePackageService")
    //private ServicePackageService servicePackageService;

    public LoadPackageByID() {
        super();
    }

    public void init() throws ServletException {}

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //TODO: Load package
    }
}