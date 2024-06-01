package br.com.sistema.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Instituicao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nome;

    @Column
    private String cep;

    @Column
    private String bairro;

    @Column
    private String estado;

    @Column
    private String rua;

    @Column
    private String numero;

    @Column
    private String descricao;

    @Column
    private String email;

    @Column
    private String telefone;

    @Column
    private String tipoInstituicao;

    @OneToMany(mappedBy = "instituicao")
    private List<Pessoa> pessoas;
}
