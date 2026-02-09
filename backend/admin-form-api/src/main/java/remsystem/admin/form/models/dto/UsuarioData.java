package remsystem.admin.form.models.dto;

import lombok.*;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioData {
    private String nombre;
    private String email;
    private LocalDate fechaRegistro;
    private String tipo;
}