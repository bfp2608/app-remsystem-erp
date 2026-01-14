package com.remsystem.api_erp.models.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "ADMINISTRADOR")
@Data
public class Administrador {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_administrador",nullable = false)
    private int idAdministrador;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario",nullable = false)
    private Usuario usuario;

    @Column(name = "permisos")
    private boolean permisos;

    @Column(name = "nivel_administrador",nullable = false)
    private String nivelAdministrador;
}