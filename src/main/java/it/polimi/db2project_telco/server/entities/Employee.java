package it.polimi.db2project_telco.server.entities;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;

@Entity
@Table(name= "Employees", schema = "db2telco")
@NamedQuery(name = "Employee.findByUsername", query = "SELECT u FROM Employee u WHERE u.username = :usr")

public class Employee implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name="Username")
    private String username;

    @Column(name="Password")
    @JsonIgnore
    private String password;

    public Employee() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
}
