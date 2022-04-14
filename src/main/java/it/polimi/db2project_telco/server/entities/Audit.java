package it.polimi.db2project_telco.server.entities;

import it.polimi.db2project_telco.server.entities.keys.AuditID;

import jakarta.persistence.*;

import java.io.Serializable;
import java.sql.Timestamp;


@Entity
@IdClass(AuditID.class)
@Table(name= "Audits", schema = "db2telco")
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

}
