package it.polimi.db2project_telco.entities;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name= "Service_Pkgs", schema = "db2telco")
public class ServicePackage implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name="Name")
    private String name;

    @OneToMany(mappedBy = "servicePackage", fetch = FetchType.EAGER)
    private List<FixedPhone> fixedPhoneServices;

    @OneToMany(mappedBy = "servicePackage", fetch = FetchType.EAGER)
    private List<MobilePhone> mobilePhoneServices;

    @OneToMany(mappedBy = "servicePackage", fetch = FetchType.EAGER)
    private List<MobilePhone> internetServices;

    @OneToMany(mappedBy = "servicePackage", fetch = FetchType.LAZY)
    private List<ValidityPeriod> validityPeriods;

    @OneToMany(mappedBy = "servicePackage", fetch = FetchType.LAZY)
    private List<OptionalProduct> optionalProducts;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<FixedPhone> getFixedPhoneServices() {
        return fixedPhoneServices;
    }

    public void setFixedPhoneServices(List<FixedPhone> fixedPhoneServices) {
        this.fixedPhoneServices = fixedPhoneServices;
    }

    public List<MobilePhone> getMobilePhoneServices() {
        return mobilePhoneServices;
    }

    public void setMobilePhoneServices(List<MobilePhone> mobilePhoneServices) {
        this.mobilePhoneServices = mobilePhoneServices;
    }

    public List<MobilePhone> getInternetServices() {
        return internetServices;
    }

    public void setInternetServices(List<MobilePhone> internetServices) {
        this.internetServices = internetServices;
    }

    public List<ValidityPeriod> getValidityPeriods() {
        return validityPeriods;
    }

    public void setValidityPeriods(List<ValidityPeriod> validityPeriods) {
        this.validityPeriods = validityPeriods;
    }

    public List<OptionalProduct> getOptionalProducts() {
        return optionalProducts;
    }

    public void setOptionalProducts(List<OptionalProduct> optionalProducts) {
        this.optionalProducts = optionalProducts;
    }
}