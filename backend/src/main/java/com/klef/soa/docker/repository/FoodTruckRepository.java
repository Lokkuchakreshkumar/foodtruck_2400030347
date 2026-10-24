package com.klef.soa.docker.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.soa.docker.entity.FoodTruckEntity;

@Repository
public interface FoodTruckRepository extends JpaRepository<FoodTruckEntity, Long> {
    List<FoodTruckEntity> findByOperating(Boolean operating);
    List<FoodTruckEntity> findByCuisineIgnoreCase(String cuisine);
}
