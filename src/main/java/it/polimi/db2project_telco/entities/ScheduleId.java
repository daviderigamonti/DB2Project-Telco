package it.polimi.db2project_telco.entities;


import java.io.Serializable;
import java.sql.Timestamp;

public class ScheduleId implements Serializable {
    private static final long serialVersionUID = 1L;

    private int userID;
    private Timestamp timestamp;

    public int getUserID() {
        return userID;
    }

    public ScheduleId(int userID, Timestamp timestamp) {
        this.userID = userID;
        this.timestamp = timestamp;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}
