package com.klef.soa.docker;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import com.klef.soa.docker.dto.FoodTruckRequestDTO;

@SpringBootTest
class FoodTruckServiceApplicationTests {

    @Test
    void contextLoads() {
    }

    @Test
    void testFoodTruckRequestDTOCreation() {
        FoodTruckRequestDTO dto = FoodTruckRequestDTO.builder()
                .truckName("Street Gourmet")
                .cuisine("Italian")
                .dailySales(850.0)
                .operating(true)
                .build();

        assertEquals("Street Gourmet", dto.getTruckName());
        assertEquals("Italian", dto.getCuisine());
        assertEquals(850.0, dto.getDailySales());
        assertTrue(dto.getOperating());
    }
}
