package com.klef.soa.docker.service;

import java.util.List;
import java.util.Optional;
import com.klef.soa.docker.dto.FoodTruckRequestDTO;
import com.klef.soa.docker.dto.FoodTruckResponseDTO;
import com.klef.soa.docker.entity.FoodTruckEntity;

public interface FoodTruckService {

    FoodTruckResponseDTO addFoodTruck(FoodTruckRequestDTO requestDTO);

    FoodTruckEntity addFoodTruck(FoodTruckEntity foodTruck);

    List<FoodTruckResponseDTO> getAllFoodTrucks();

    Optional<FoodTruckResponseDTO> getFoodTruckById(Long id);

    FoodTruckResponseDTO updateFoodTruck(Long id, FoodTruckRequestDTO requestDTO);

    boolean deleteFoodTruck(Long id);
}
