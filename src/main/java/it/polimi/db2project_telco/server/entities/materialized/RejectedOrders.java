package it.polimi.db2project_telco.server.entities.materialized;

import it.polimi.db2project_telco.server.entities.ServicePackage;
import it.polimi.db2project_telco.server.entities.User;
import it.polimi.db2project_telco.server.entities.util.OrderStatus;

import jakarta.persistence.*;

import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Table(name= "RejectedOrders", schema = "db2telco")
@NamedQuery(name = "RejectedOrders.findAll", query = "SELECT o FROM RejectedOrders o")
public class RejectedOrders implements Serializable {   //TODO: rename as suspended orders?
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "ID")
    private int id;

    @ManyToOne
    @JoinColumn(name = "User_ID")
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Pkg_ID")
    private ServicePackage servicePackage;

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

    public ServicePackage getServicePackage() {
        return servicePackage;
    }

    public void setServicePackage(ServicePackage servicePackage) {
        this.servicePackage = servicePackage;
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
}