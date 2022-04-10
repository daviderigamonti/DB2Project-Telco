package it.polimi.db2project_telco.server.entities;

import jakarta.persistence.*;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Entity
@Table(name= "Orders", schema = "db2telco")
public class Order implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @ManyToOne
    @JoinColumn(name = "User_ID")
    private User user;

    @OneToOne
    @JoinColumn(name = "Pkg_ID")
    private ServicePackage servicePackage;

    @OneToOne
    @JoinColumn(name = "Validity_Period_ID")
    private ValidityPeriod validityPeriod;

    @ManyToMany
    @JoinTable(name="OrderComprehendsOptional",
            joinColumns = @JoinColumn(name = "Order_ID"),
            inverseJoinColumns = @JoinColumn(name = "Optional_ID")
    )
    private List<OptionalProduct> optionalProducts;

    @Column(name="Activation_Date")
    private Date activationDate;

    @Column(name="Timestamp")
    private Timestamp timestamp;

    @Column(name="Status")
    private String status;

    @Column(name="Total")
    private int total;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public ValidityPeriod getValidityPeriod() {
        return validityPeriod;
    }

    public void setValidityPeriod(ValidityPeriod validityPeriod) {
        this.validityPeriod = validityPeriod;
    }

    public ServicePackage getServicePackage() {
        return servicePackage;
    }

    public void setServicePackage(ServicePackage servicePackage) {
        this.servicePackage = servicePackage;
    }

    public Date getActivationDate() {
        return activationDate;
    }

    public void setActivationDate(Date activationDate) {
        this.activationDate = activationDate;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public List<OptionalProduct> getOptionalProducts() {
        return optionalProducts;
    }

    public void setOptionalProducts(List<OptionalProduct> optionalProducts) {
        this.optionalProducts = optionalProducts;
    }
}