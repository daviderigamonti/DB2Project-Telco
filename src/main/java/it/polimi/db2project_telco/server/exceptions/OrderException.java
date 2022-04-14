package it.polimi.db2project_telco.server.exceptions;

public class OrderException extends Exception {
    private static final long serialVersionUID = 1L;

    public OrderException(String message) {
        super(message);
    }
}
