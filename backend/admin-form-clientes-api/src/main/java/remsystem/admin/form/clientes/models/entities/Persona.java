package remsystem.admin.form.clientes.models.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "persona")
@Data
public class Persona{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_persona")
    private long idPersona;
}