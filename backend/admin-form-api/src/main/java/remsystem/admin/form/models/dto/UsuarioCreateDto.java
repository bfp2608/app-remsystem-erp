package remsystem.admin.form.models.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioCreateDto {
    private String nombreUsuario;
    private String email;
    private String contrasenia;
    private String tipoUsuario;
}