package it.polimi.db2project_telco.server.entities.util;

public enum OrderStatus {
    VALID,
    PENDING,
    FAILED;

    public static OrderStatus fromOutcome(boolean outcome) {
        if(outcome)
            return VALID;
        return FAILED;
    }

}
