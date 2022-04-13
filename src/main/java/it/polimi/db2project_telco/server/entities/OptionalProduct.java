package it.polimi.db2project_telco.server.entities;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name= "Optional_Products", schema = "db2telco")
@NamedQuery(name = "OptionalProduct.findByID", query = "SELECT u FROM User u WHERE u.username = :usr AND u.password = :psw")
public class OptionalProduct implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name="Name")
    private String name;

    @Column(name="Monthly_Fee")
    private float fee;

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

    public float getFee() {
        return fee;
    }

    public void setFee(float fee) {
        this.fee = fee;
    }
}
