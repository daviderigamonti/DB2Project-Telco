package it.polimi.db2project_telco.server.entities;

import it.polimi.db2project_telco.server.entities.keys.AuditID;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@IdClass(AuditID.class)
@Table(name= "ServiceActivationSchedule", schema = "db2telco")
public class ServiceActivationSchedule implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "User_ID")
    private User user;

    @Id
    @OneToOne( fetch = FetchType.EAGER)
    @JoinColumn(name = "Order_ID")
    private Order order;

    @Column(name = "Deactivation_Date")
    private Date deactivationDate;



    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Date getDeactivationDate() {
        return deactivationDate;
    }

    public void setDeactivationDate(Date deactivationDate) {
        this.deactivationDate = deactivationDate;
    }
}