package br.com.sistema.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class Acao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nome;

    @Column
    private String turma;

    @Column
    private String semestre;//será entidade

    @Column
    private String modalidade;//será entidade

    @Column
    private Integer qtdParticipantes;

    @Column
    private Integer qtdVagas;

    @Column
    private String localRealizacao;

    //@ManyToOne(fetch = FetchType.LAZY)
    //@JoinColumn(name = "acao_pai_id")
    //private Acao acaoPai;

    @ManyToOne
    @JoinColumn(name = "instituicao_id")
    private Instituicao instituicao;

    @ManyToOne
    @JoinColumn(name = "tipo_acao_id")
    private TipoAcao tipoAcao;

    @ManyToOne
    @JoinColumn(name = "acao_id")
    private Acao projeto;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date dtCriacao;
}
