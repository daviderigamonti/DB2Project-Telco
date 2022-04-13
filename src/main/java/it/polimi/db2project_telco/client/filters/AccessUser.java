package it.polimi.db2project_telco.client.filters;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

public class AccessUser implements Filter {

    public AccessUser() {}

    public void destroy() {}

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        String landingPage = req.getServletContext().getContextPath() + "/landing.html";  // TODO: substitute with enum containing the pages references

        HttpSession s = req.getSession();

        // If the user is not logged in or if it hasn't authenticated
        // as a guest user, return a forbidden response
        if (s.isNew() || (s.getAttribute("user") == null &&
                (s.getAttribute("guest") == null || !(boolean)s.getAttribute("guest")))) {
            System.out.print("Forbidden access\n");
            res.setStatus(HttpServletResponse.SC_FORBIDDEN);
            res.sendRedirect(landingPage);
            return;
        }

        // pass the request along the filter chain
        chain.doFilter(request, response);
    }

    public void init(FilterConfig fConfig) throws ServletException {}
}