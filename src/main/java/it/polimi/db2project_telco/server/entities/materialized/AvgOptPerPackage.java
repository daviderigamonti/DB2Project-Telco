package it.polimi.db2project_telco.server.entities.materialized;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name= "AvgOptPerPackage", schema = "db2telco")
@NamedQuery(name = "AvgOptPerPackage.findAll", query = "SELECT a FROM AvgOptPerPackage a")
public class AvgOptPerPackage implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Pkg_ID")
    private int id;

    @Column(name="Name")
    private String name;

    @Column(name="AvgOptionals")
    private float avgOptionals;

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

    public float getAvgOptionals() {
        return avgOptionals;
    }

    public void setAvgOptionals(float avgOptionals) {
        this.avgOptionals = avgOptionals;
    }
}
