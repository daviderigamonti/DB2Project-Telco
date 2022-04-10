package it.polimi.db2project_telco.server.entities.keys;

import java.io.Serializable;

public class ScheduleID implements Serializable {
    private static final long serialVersionUID = 1L;

    private int user;
    private int order;

    public ScheduleID() {
        this.user = 0;
        this.order = 0;
    }

    public ScheduleID(int userID, int order) {
        this.user = userID;
        this.order = order;
    }

    public int getUserID() {
        return user;
    }

    public void setUserID(int userID) {
        this.user = userID;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    @Override
    public boolean equals(Object obj) {
        if (getClass() != obj.getClass())
            return false;
        ScheduleID scheduleID = (ScheduleID) obj;
        return this.user == scheduleID.user &&
                this.getOrder() == scheduleID.getOrder();
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }
}
