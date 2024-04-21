package br.com.sistema.DTO;

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
