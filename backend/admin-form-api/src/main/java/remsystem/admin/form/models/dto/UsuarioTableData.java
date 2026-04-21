package remsystem.admin.form.models.dto;

import lombok.*;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioTableData{
    private String nombres;
    private String email;
    private LocalDate fechaRegistro;
    private String tipo;
    private boolean estado;
}