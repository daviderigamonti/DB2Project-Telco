package it.polimi.db2project_telco.client.util;

public enum PagesNames  {
    ROOT("/DB2Project_Telco/"),
    LANDING("landing.html"),
    EMP_LANDING("emp_landing.html"),
    HOME("home.html"),
    BUYSERVICE("buyservice.html"),
    CONFIRMATION("confirmation.html");

    private final String value;

    PagesNames(String value) {
        this.value = value;
    }

    public String value() {
        return this.value;
    }
}
