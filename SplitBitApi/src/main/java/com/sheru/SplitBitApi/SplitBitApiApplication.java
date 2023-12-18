package com.sheru.SplitBitApi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class SplitBitApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SplitBitApiApplication.class, args);
	}

}
