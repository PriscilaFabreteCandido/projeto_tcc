package br.com.sistema.DTO.Acao;

import br.com.sistema.DTO.InstituicaoDTO;
import br.com.sistema.DTO.ProjetoDTO;
import br.com.sistema.DTO.TipoAcaoDTO;
import br.com.sistema.Model.Instituicao;
import br.com.sistema.Model.Projeto;
import br.com.sistema.Model.TipoAcao;
import jakarta.persistence.*;
import lombok.Data;

@Data
public class AcaoDTO {

    private Long id;

    private String nome;

    private Integer qtdParticipantes;

    private Integer qtdVagas;

    private String localRealizacao;

    private InstituicaoDTO instituicao;

    private TipoAcaoDTO tipoAcao;

    private ProjetoDTO projeto;

}
