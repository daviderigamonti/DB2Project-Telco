package it.polimi.db2project_telco.server.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name= "Validity_Periods", schema = "db2telco")
public class ValidityPeriod implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Pkg_ID")
    @JsonBackReference
    private ServicePackage servicePackage;

    @Column(name="Months")
    private int months;

    @Column(name="Monthly_Fee")
    private float fee;

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

    public float getFee() {
        return fee;
    }

    public void setFee(float fee) {
        this.fee = fee;
    }

    public int getMonths() {
        return months;
    }

    public void setMonths(int months) {
        this.months = months;
    }
}
