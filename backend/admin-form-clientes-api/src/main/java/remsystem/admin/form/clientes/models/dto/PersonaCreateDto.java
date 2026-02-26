package remsystem.admin.form.clientes.models.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PersonaCreateDto {

    @NotNull(message = "El ID de la empresa es obligatorio.")
    private Long idEmpresa;

    @NotBlank(message = "El numero de RUC es obligatorio.")
    @Size(max = 20, message = "El RUC no puede superar los 20 caracteres.")
    private String ruc;

    @NotBlank(message = "Los nombres completos son obligatorios.")
    @Size(max = 255, message = "Los nombres completos no pueden superar los 255 caracteres.")
    private String nombresCompletos;

    @NotBlank(message = "El cargo es obligatorio.")
    @Size(max = 120, message = "El cargo no puede superar los 120 caracteres.")
    private String cargo;

    @NotBlank(message = "el correo electrónico es obligatorio.")
    @Size(max = 150, message = "El correo no puede superar los 150 caracteres.")
    private String correoPersonal;

    @NotBlank(message = "El numero de celular es obligatorio.")
    @Size(max = 20, message = "El celular no puede superar los 20 caracteres.")
    private String celularPersonal;


}