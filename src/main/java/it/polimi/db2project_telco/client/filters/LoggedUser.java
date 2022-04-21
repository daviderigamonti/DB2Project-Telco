package it.polimi.db2project_telco.client.filters;

import it.polimi.db2project_telco.client.util.PagesNames;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

public class LoggedUser implements Filter {

    public LoggedUser() {}

    public void destroy() {}

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpSession s = req.getSession();

        // If the user is not logged in, return a forbidden response
        if (s.isNew() || s.getAttribute("user") == null || s.getAttribute("guest") != null) {
            HttpServletResponse res = (HttpServletResponse) response;
            String landingPage = PagesNames.root(req) + PagesNames.LANDING.value();

            res.setStatus(HttpServletResponse.SC_FORBIDDEN);
            res.sendRedirect(landingPage);

            return;
        }

        // pass the request along the filter chain
        chain.doFilter(request, response);
    }

    public void init(FilterConfig fConfig) throws ServletException {}
}
