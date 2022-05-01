package it.polimi.db2project_telco.server.entities;

import it.polimi.db2project_telco.server.entities.util.OrderStatus;

import jakarta.persistence.*;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Entity
@Table(name= "Orders", schema = "db2telco")
@NamedQuery(name = "Order.getRejectedOrdersByUser", query = "SELECT o FROM Order o " +
                                                            "WHERE o.user.id = :id AND " +
                                                            "o.status = it.polimi.db2project_telco.server.entities.util.OrderStatus.FAILED"
)
public class Order implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "User_ID")
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Pkg_ID")
    private ServicePackage servicePackage;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Validity_Period_ID")
    private ValidityPeriod validityPeriod;

    @OneToMany(fetch = FetchType.LAZY)
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
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @Column(name="Total")
    private float total;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public float getTotal() {
        return total;
    }

    public void setTotal(float total) {
        this.total = total;
    }

    public List<OptionalProduct> getOptionalProducts() {
        return optionalProducts;
    }

    public void setOptionalProducts(List<OptionalProduct> optionalProducts) {
        this.optionalProducts = optionalProducts;
    }
}