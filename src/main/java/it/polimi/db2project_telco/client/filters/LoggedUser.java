package it.polimi.db2project_telco.client.filters;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

public class LoggedUser implements Filter {

    public LoggedUser() {
    }

    public void destroy() {
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        HttpSession s = req.getSession();

        // If the user is not logged in, return a forbidden response
        if (s.isNew() || s.getAttribute("user") == null) {
            System.out.print("Forbidden access\n");
            res.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return;
        }

        // pass the request along the filter chain
        chain.doFilter(request, response);
    }

    public void init(FilterConfig fConfig) throws ServletException {}
}
