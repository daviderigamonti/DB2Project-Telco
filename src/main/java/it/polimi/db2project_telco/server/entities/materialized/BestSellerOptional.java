package it.polimi.db2project_telco.server.entities.materialized;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name= "BestSellerOptional", schema = "db2telco")
@NamedQuery(name = "BestSellerOptional.findAll", query = "SELECT o FROM BestSellerOptional o")
public class BestSellerOptional implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Opt_ID")    //TODO: cambiare id eventualmente
    private int id;

    @Column(name="Name")
    private String name;

    @Column(name="TotalSales")
    private int totalSales;

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

    public int getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(int totalSales) {
        this.totalSales = totalSales;
    }
}
