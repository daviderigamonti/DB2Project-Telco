package it.polimi.db2project_telco.server.entities;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name= "Users", schema = "db2telco")
public class ServiceActivationSchedule implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @ManyToOne
    @JoinColumn(name = "ID")
    private User user;

}