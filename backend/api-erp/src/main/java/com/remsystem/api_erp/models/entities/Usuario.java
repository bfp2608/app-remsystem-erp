package com.remsystem.api_erp.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "USUARIO")
@Data
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_usuario", nullable = false)
    private int idUsuario;

    @Column(name = "razon_social",nullable = false)
    private String razonSocial;

    @Column(name = "email",unique = true,nullable = false)
    private String email;

    @Column(name = "contrasenia",nullable = false)
    private String contrasena;

    @Column(name = "fecha_registro_sistema",nullable = false)
    private LocalDate fechaRegistroSistem;

    @Column(name = "codigo",nullable = false,unique = true)
    private String codigo;

    @Column(name = "tipo_usuario",nullable = false)
    private String tipoUsuario;

    @Column(name = "tipo_identificacion")
    private String tipoIdentificacion;

    @Column(name = "num_identificacion",nullable = false,unique = true)
    private String numIdentificacion;

    @Column(name = "celular",nullable = false,unique = true)
    private String celular;
}