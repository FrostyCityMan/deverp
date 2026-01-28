package com.deverp.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.deverp")
public class ErpApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(ErpApiApplication.class, args);
    }
}
