package com.klef.soa.docker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "food_truck")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FoodTruckEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "truck_name", nullable = false)
    private String truckName;

    @Column(name = "cuisine", nullable = false)
    private String cuisine;

    @Column(name = "daily_sales")
    private Double dailySales;

    @Column(name = "operating")
    private Boolean operating;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTruckName() {
        return truckName;
    }

    public void setTruckName(String truckName) {
        this.truckName = truckName;
    }

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public Double getDailySales() {
        return dailySales;
    }

    public void setDailySales(Double dailySales) {
        this.dailySales = dailySales;
    }

    public Boolean getOperating() {
        return operating;
    }

    public void setOperating(Boolean operating) {
        this.operating = operating;
    }
}
