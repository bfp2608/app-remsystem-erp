package com.remsystem.api_erp.models.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "PERSONA")
@Data
public class Persona {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_persona",nullable = false)
    private int idPersona;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cliente",nullable = false)
    private Cliente cliente;

    @Column(name = "grado_academico")
    private String gradoAcademico;

    @Column(name = "rol_empresa")
    private String rolEmpresa;

    @Column(name = "experiencia")
    private int experiencia;

    @Column(name = "edad")
    private int edad;

    @Column(name = "ocupacion")
    private String ocupacion;
}