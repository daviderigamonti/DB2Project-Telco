package it.polimi.db2project_telco.server.entities;


import jakarta.persistence.*;

import java.io.Serializable;


@Entity
@Table(name= "Mobile_Phone", schema = "db2telco")
public class MobilePhone implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @ManyToOne
    @JoinColumn(name = "Pkg_ID")
    private ServicePackage servicePackage;

    @Column(name="Minutes_N")
    private int minutes;

    @Column(name="SMS_N")
    private int sms;

    @Column(name="Minutes_Fee")
    private float minuteFee;

    @Column(name="SMS_Fee")
    private float smsFee;

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

    public int getMinutes() {
        return minutes;
    }

    public void setMinutes(int minutes) {
        this.minutes = minutes;
    }

    public int getSms() {
        return sms;
    }

    public void setSms(int sms) {
        this.sms = sms;
    }

    public float getMinuteFee() {
        return minuteFee;
    }

    public void setMinuteFee(float minuteFee) {
        this.minuteFee = minuteFee;
    }

    public float getSmsFee() {
        return smsFee;
    }

    public void setSmsFee(float smsFee) {
        this.smsFee = smsFee;
    }
}
