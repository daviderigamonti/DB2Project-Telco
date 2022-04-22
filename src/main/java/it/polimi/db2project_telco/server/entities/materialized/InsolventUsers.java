package it.polimi.db2project_telco.server.entities.materialized;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name= "InsolventUsers", schema = "db2telco")
@NamedQuery(name = "InsolventUsers.findAll", query = "SELECT u FROM InsolventUsers u")
public class InsolventUsers implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "ID")
    private int id;

    @Column(name="Mail")
    private String mail;

    @Column(name="Username")
    private String username;

    @Column(name="Failed_Payments")
    private int failed_payments;

    @Column(name="Insolvent")
    private boolean is_insolvent;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getFailed_payments() {
        return failed_payments;
    }

    public void setFailed_payments(int failed_payments) {
        this.failed_payments = failed_payments;
    }

    public boolean isIs_insolvent() {
        return is_insolvent;
    }

    public void setIs_insolvent(boolean is_insolvent) {
        this.is_insolvent = is_insolvent;
    }
}
