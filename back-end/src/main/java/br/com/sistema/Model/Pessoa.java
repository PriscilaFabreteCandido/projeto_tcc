package br.com.sistema.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nome;

    @Column
    private String cpf;

    @Column
    @Email
    private String email;

    @Column
    private String senha;

    @Column
    private String matricula;

    @Column
    private String nivelEscolaridade;

    @Temporal(TemporalType.DATE)
    private Date dtNascimento;

    @ManyToOne
    @JoinColumn(name = "funcao_id")
    private Funcao funcao;

    @ManyToOne
    @JoinColumn(name = "instituicao_id")
    private Instituicao instituicao;

}
