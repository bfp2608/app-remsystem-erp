package remsystem.admin.form.clientes.models.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
public class PersonaCreateDto {
    private String rucEmpresa;
    private String nombresCompletos;
    private String cargo;
    private String correoPersonal;
    private String celularPersonal;

}