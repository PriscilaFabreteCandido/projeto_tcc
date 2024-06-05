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

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String cpf;

    private String vinculo;
    private String telefone;

    @Column(nullable = true)
    @Email
    private String email;

    @Column(nullable = true)
    private String matricula;

    private boolean ativo = true;

    @Column(nullable = false)
    private String nivelEscolaridade;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date dtNascimento;

    @ManyToOne
    @JoinColumn(name = "funcao_id")
    private Funcao funcao;

    @ManyToOne
    @JoinColumn(name = "instituicao_id")
    private Instituicao instituicao;

    @ManyToOne
    @JoinColumn(name = "curso_id")
    private Curso curso;


    @OneToMany(mappedBy = "pessoa")
    private List<AcaoPessoa> acaoPessoas;
}
