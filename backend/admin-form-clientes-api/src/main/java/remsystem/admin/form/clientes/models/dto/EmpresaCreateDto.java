package remsystem.admin.form.clientes.models.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import java.time.*;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
public class EmpresaCreateDto {

    @NotBlank(message = "El ruc es obligatorio")
    @Pattern(regexp = "\\d{20}", message = "El ruc debe tener 20 dígitos numéricos")
    private String ruc;
    @NotBlank(message = "La razón social es obligatoria")
    private String razonSocial;
    private String nombreComercial;

    private String telefono;
    @Email(message = "Correo inválido")
    private String correoCorporativo;

    private String direccion;

    @NotNull(message = "El distrito es obligatorio")
    private Long idDistrito; // incluye pais/dep/prov implícitamente

    private LocalDate fechaInicioActividades;
    private String sitioWeb;

    private String condicionRuc;

    private List<String> etiquetas; // Cliente, Proveedor, etc

    private String tipoEmpresa; // Pyme, Multinacional, etc
}