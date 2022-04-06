package it.polimi.db2project_telco.entities;


import jakarta.persistence.*;

import java.io.Serializable;


@Entity
@Table(name= "Internet", schema = "db2telco")
public class Internet implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @ManyToOne
    @JoinColumn(name = "Pkg_ID")
    private ServicePackage servicePackage;

    @Column(name="GB_N")
    private int gigabytes;

    @Column(name="GB_Fee")
    private int gigabyteFee;

    @Column(name="Fixed")
    private boolean is_fixed;

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

    public int getGigabytes() {
        return gigabytes;
    }

    public void setGigabytes(int gigabytes) {
        this.gigabytes = gigabytes;
    }

    public int getGigabyteFee() {
        return gigabyteFee;
    }

    public void setGigabyteFee(int gigabyteFee) {
        this.gigabyteFee = gigabyteFee;
    }

    public boolean isIs_fixed() {
        return is_fixed;
    }

    public void setIs_fixed(boolean is_fixed) {
        this.is_fixed = is_fixed;
    }
}
