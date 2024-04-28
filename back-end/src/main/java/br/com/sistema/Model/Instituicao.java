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
    private String avenida;

    @Column
    private String rua;

    @Column
    private String numero;

    @Column
    private String descricao;

    //@OneToMany(mappedBy = "instituicao")
    //private List<Pessoa> pessoas = new ArrayList<>();

    //@OneToMany(mappedBy = "instituicao")
    //private List<Acao> acoes = new ArrayList<>();
}
