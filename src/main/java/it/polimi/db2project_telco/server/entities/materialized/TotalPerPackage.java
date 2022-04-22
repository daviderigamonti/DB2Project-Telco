package it.polimi.db2project_telco.server.entities.materialized;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name= "TotalPerPackage", schema = "db2telco")
@NamedQuery(name = "TotalPerPackage.findAll", query = "SELECT t FROM TotalPerPackage t")
public class TotalPerPackage implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Pkg_ID")
    private int id;

    @Column(name="Name")
    private String name;

    @Column(name="Total")
    private float total;

    @Column(name="TotalBeforeOptionals")
    private float totalBeforeOptionals;

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

    public float getTotal() {
        return total;
    }

    public void setTotal(float total) {
        this.total = total;
    }

    public float getTotalBeforeOptionals() {
        return totalBeforeOptionals;
    }

    public void setTotalBeforeOptionals(float totalBeforeOptionals) {
        this.totalBeforeOptionals = totalBeforeOptionals;
    }
}
