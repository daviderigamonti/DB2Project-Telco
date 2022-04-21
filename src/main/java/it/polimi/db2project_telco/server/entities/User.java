package it.polimi.db2project_telco.server.entities;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name= "Users", schema = "db2telco")
@NamedQuery(name = "User.findByUsername", query = "SELECT u FROM User u WHERE u.username = :usr")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name="Mail")
    private String mail;

    @Column(name="Username")
    private String username;

    @Column(name="Password")
    @JsonIgnore
    private String password;

    @Column(name="Failed_Payments")
    @JsonIgnore
    private int failed_payments;

    @Column(name="Insolvent")
    @JsonIgnore
    private boolean is_insolvent;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Order> orders;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<ServiceActivationSchedule> schedules;

    public User() {}

    public User(String mail, String username, String password) {
        this.mail = mail;
        this.username = username;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getFailed_payments() {
        return failed_payments;
    }

    public void setFailed_payments(int failed_payments) {
        this.failed_payments = failed_payments;
    }

    public boolean isIs_insolvent() {
        return is_insolvent;
    }

    public void setIs_insolvent(boolean is_insolvent) {
        this.is_insolvent = is_insolvent;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public List<ServiceActivationSchedule> getSchedules() {
        return schedules;
    }

    public void setSchedules(List<ServiceActivationSchedule> schedules) {
        this.schedules = schedules;
    }
}
