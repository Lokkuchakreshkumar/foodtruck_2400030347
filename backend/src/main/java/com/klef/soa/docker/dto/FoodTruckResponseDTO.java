package com.klef.soa.docker.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Data Transfer Object for Food Truck responses")
public class FoodTruckResponseDTO {

    @Schema(description = "Auto-generated unique identifier", example = "1")
    private Long id;

    @Schema(description = "Name of the food truck", example = "Taco Fiesta Express")
    private String truckName;

    @Schema(description = "Type of cuisine served", example = "Mexican")
    private String cuisine;

    @Schema(description = "Daily sales amount", example = "1250.50")
    private Double dailySales;

    @Schema(description = "Whether the truck is actively operating", example = "true")
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
