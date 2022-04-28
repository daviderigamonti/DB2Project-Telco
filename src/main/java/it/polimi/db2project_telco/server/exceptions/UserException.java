package it.polimi.db2project_telco.server.exceptions;

public class UserException extends Exception {
    private static final long serialVersionUID = 1L;

    public UserException(String message) {
        super(message);
    }
}
