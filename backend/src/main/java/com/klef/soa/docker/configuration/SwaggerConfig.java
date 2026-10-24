package com.klef.soa.docker.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Food Truck Management REST API")
                        .version("1.0.0")
                        .description("Comprehensive REST API for managing Food Truck operations including creation, retrieval, updates, and deletion. Built with Spring Boot and PostgreSQL under package com.klef.soa.docker.")
                        .contact(new Contact()
                                .name("KLEF SOA Docker Exam")
                                .email("student@klu.ac.in"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://springdoc.org")))
                .servers(List.of(
                        new Server().url("http://localhost:8081").description("Local Development Server")
                ));
    }
}
