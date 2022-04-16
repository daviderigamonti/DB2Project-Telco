package it.polimi.db2project_telco.client.util;

public enum PagesNames  {
    LANDING("landing.html"),
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
