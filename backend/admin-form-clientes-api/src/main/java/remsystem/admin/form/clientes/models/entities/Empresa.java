package remsystem.admin.form.clientes.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "empresa")
@Data
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_empresa")
    private long idEmpresa;

    @ManyToOne
    @JoinColumn(name = "id_distrito")
    private Distrito distrito;

    @OneToMany(mappedBy = "empresa")
    @JsonIgnore
    private List<Persona> personas;

    @OneToMany(mappedBy = "empresa")
    @JsonIgnore
    private List<Sucursal> sucursales;

    @OneToMany(mappedBy = "empresa")
    @JsonIgnore
    private List<EmpresaTipo> tipos;

    @Column(name = "ruc", nullable = false)
    private String ruc;

    @Column(name = "razon_social", nullable = false)
    private String razonSocial;

    @Column(name = "nombre_comercial")
    private String nombreComercial;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "correo_corporativo")
    private String correoCorporativo;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "fecha_inicio_actividades")
    private LocalDate fechaInicioActividades;

    @Column(name = "sitio_web")
    private String sitioWeb;

    @Column(name = "condicion_ruc")
    private String condicionRuc;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}