package com.klef.soa.docker.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Data Transfer Object for creating or updating a Food Truck (no ID required)")
public class FoodTruckRequestDTO {

    @NotBlank(message = "Truck name cannot be blank")
    @Size(min = 2, max = 100, message = "Truck name must be between 2 and 100 characters")
    @Schema(description = "Name of the food truck", example = "Taco Fiesta Express")
    private String truckName;

    @NotBlank(message = "Cuisine cannot be blank")
    @Size(min = 2, max = 50, message = "Cuisine must be between 2 and 50 characters")
    @Schema(description = "Type of cuisine served", example = "Mexican")
    private String cuisine;

    @NotNull(message = "Daily sales amount is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Daily sales cannot be negative")
    @DecimalMax(value = "10000000.0", message = "Daily sales cannot exceed 10,000,000")
    @Schema(description = "Estimated or recorded daily sales in dollars/currency", example = "1250.50")
    private Double dailySales;

    @NotNull(message = "Operating status must be specified (true/false)")
    @Schema(description = "Whether the food truck is currently in operation", example = "true")
    private Boolean operating;

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
