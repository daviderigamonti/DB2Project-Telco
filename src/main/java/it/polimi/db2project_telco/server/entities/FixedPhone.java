package it.polimi.db2project_telco.server.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name= "Fixed_Phone", schema = "db2telco")
public class FixedPhone implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @ManyToOne
    @JoinColumn(name = "Pkg_ID")
    @JsonBackReference
    private ServicePackage servicePackage;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public ServicePackage getServicePackage() {
        return servicePackage;
    }

    public void setServicePackage(ServicePackage servicePackage) {
        this.servicePackage = servicePackage;
    }
}
