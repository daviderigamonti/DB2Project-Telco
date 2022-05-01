package it.polimi.db2project_telco.client.util;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

public enum Accounts {
    GUEST("guest"),
    USER("user"),
    EMPLOYEE("employee");

    private final String value;

    Accounts(String value) {
        this.value = value;
    }

    public String value() {
        return this.value;
    }

    // Remove all the accounts from a session, expect the one in the object
    public void invalidateAccountSession(HttpServletRequest req) {
        HttpSession s = req.getSession();
        for(Accounts account : Accounts.values())
            if(!account.value().equals(value))
                s.removeAttribute(account.value());
    }
}
