package it.polimi.db2project_telco.server.entities;

import it.polimi.db2project_telco.server.entities.keys.AuditID;

import jakarta.persistence.*;

import java.io.Serializable;
import java.sql.Timestamp;


@Entity
@IdClass(AuditID.class)
@Table(name= "Audits", schema = "db2telco")
@NamedQuery(name = "Audit.findAll", query = "SELECT a FROM Audit a")
public class Audit implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "User_ID")
    private int userID;

    @Id
    @Column(name = "Timestamp")
    private Timestamp timestamp;

    @Column(name="Mail")
    private String mail;

    @Column(name="Username")
    private String username;

    @Column(name = "Amount")
    private float amount;

    public int getUserID() {
        return userID;
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

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }
}
