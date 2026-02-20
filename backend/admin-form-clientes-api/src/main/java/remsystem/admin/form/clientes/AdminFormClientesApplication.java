package remsystem.admin.form.clientes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class AdminFormClientesApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdminFormClientesApplication.class, args);
	}

}
