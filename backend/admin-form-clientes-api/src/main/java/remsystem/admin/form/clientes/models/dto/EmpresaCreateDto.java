package remsystem.admin.form.clientes.models.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import java.time.*;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
public class EmpresaCreateDto {

    private String ruc;
    private String razonSocial;
    private String nombreComercial;

    private String telefono;
    private String correoCorporativo;

    private String direccion;

    private Long idDistrito; // incluye pais/dep/prov implícitamente

    private LocalDate fechaInicioActividades;
    private String sitioWeb;

    private String condicionRuc;

    private List<String> etiquetas; // Cliente, Proveedor, etc
}