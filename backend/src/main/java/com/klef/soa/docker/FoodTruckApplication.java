package com.klef.soa.docker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FoodTruckApplication {

    public static void main(String[] args) {
        SpringApplication.run(FoodTruckApplication.class, args);
        System.out.println("=================================================");
        System.out.println("Food Truck CRUD Service (com.klef.soa.docker)");
        System.out.println("Running on port: 8081");
        System.out.println("Swagger UI: http://localhost:8081/swagger-ui.html");
        System.out.println("=================================================");
    }
}
