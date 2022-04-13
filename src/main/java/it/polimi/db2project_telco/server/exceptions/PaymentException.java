package it.polimi.db2project_telco.server.exceptions;

public class PaymentException extends Exception {
    private static final long serialVersionUID = 1L;

    public PaymentException(String message) {
        super(message);
    }
}
