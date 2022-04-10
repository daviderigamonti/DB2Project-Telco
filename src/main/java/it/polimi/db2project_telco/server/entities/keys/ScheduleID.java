package it.polimi.db2project_telco.server.entities.keys;


import java.io.Serializable;
import java.sql.Timestamp;

public class ScheduleID implements Serializable {
    private static final long serialVersionUID = 1L;

    private int userID;
    private Timestamp timestamp;

    public int getUserID() {
        return userID;
    }

    public ScheduleID(int userID, Timestamp timestamp) {
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
