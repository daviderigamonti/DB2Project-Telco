package it.polimi.db2project_telco.server.entities.keys;

import java.io.Serializable;

public class PPPPID implements Serializable {
    private static final long serialVersionUID = 1L;

    private int id;
    private int months;

    public PPPPID() {
        this.id = 0;
        this.months = 0;
    }

    public PPPPID(int id, int months) {
        this.id = id;
        this.months = months;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getMonths() {
        return months;
    }

    public void setMonths(int months) {
        this.months = months;
    }

    @Override
    public boolean equals(Object obj) {
        if (getClass() != obj.getClass())
            return false;
        PPPPID auditID = (PPPPID) obj;
        return this.id == auditID.id &&
                this.months == auditID.months ;
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }
}
