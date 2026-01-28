package com.deverp.batch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.deverp")
public class ErpBatchApplication {
    public static void main(String[] args) {
        SpringApplication.run(ErpBatchApplication.class, args);
    }
}
