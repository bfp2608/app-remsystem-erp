package remsystem.login.model.dto;

import lombok.*;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MeData {
    private String nombres;
    private String email;
    private String tipoUsuario;
    private LocalDate fechaRegistro;
}