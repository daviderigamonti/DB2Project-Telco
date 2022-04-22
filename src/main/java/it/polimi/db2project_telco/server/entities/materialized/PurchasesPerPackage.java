package it.polimi.db2project_telco.server.entities.materialized;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name= "PurchasesPerPackage", schema = "db2telco")
@NamedQuery(name = "PurchasesPerPackage.findAll", query = "SELECT p FROM PurchasesPerPackage p")
public class PurchasesPerPackage implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Pkg_ID")
    private int id;

    @Column(name="Name")
    private String name;

    @Column(name="Purchases")
    private int purchases;

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

    public int getPurchases() {
        return purchases;
    }

    public void setPurchases(int purchases) {
        this.purchases = purchases;
    }
}
