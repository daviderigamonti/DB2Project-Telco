package it.polimi.db2project_telco.client.util;

import jakarta.servlet.http.HttpServletRequest;


public enum PagesNames  {
    LANDING("landing.html"),
    EMP_LANDING("emp_landing.html");

    private final String value;

    PagesNames(String value) {
        this.value = value;
    }

    public String value() {
        return this.value;
    }

    public static String root(HttpServletRequest request) {
        return request.getContextPath() + "/";
    }
}
