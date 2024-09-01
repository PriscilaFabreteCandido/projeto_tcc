package br.com.sistema.DTO.Acao;


import br.com.sistema.Model.Instituicao;
import lombok.Data;

import java.util.Date;

@Data
public class AcaoResultRelatorioDTO {
    private Long id;
    private String descricao;
    private long ano;
    private String tipoAcao;
    private Long projetoId;
    private Long eventoId;
    private String nomeAcao;
    private String instituicaoAtendida;
    private String local;
    private int qtdParticipantes;
    private Date dtInicio;
    private Date dtFim;
    private String vinculacao;
    private String nomeProcesso;


}
