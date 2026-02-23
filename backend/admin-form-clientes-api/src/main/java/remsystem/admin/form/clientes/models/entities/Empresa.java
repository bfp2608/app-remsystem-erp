package remsystem.admin.form.clientes.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

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

    //atributos reales

    private String ruc;

    private String razonSocial;

    private String nombreComercial;

    private String celularCorporativo;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}