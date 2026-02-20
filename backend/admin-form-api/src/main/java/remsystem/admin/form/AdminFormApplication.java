package remsystem.admin.form;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class AdminFormApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdminFormApplication.class, args);
	}

}
