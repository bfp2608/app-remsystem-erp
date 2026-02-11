package remsystem.admin.form.clientes.models.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "distrito")
@Data
public class Distrito{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_distrito")
    private long idDistrito;
}