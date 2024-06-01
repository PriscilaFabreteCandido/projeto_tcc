package br.com.sistema.DTO.Acao;

import br.com.sistema.DTO.*;
import lombok.Data;

import java.util.List;
@Data
public class AcaoContextDataDTO {
    private List<TipoAcaoDTO> tiposAcoes;
    private List<AcaoDTO> projetos;
    private List<AcaoDTO> eventos;
    private List<InstituicaoDTO> instituicoes;
    private List<TurmaDTO> turmas;
    private List<PeriodoAcademicoDTO> periodos;
    private List<TipoAcaoDTO> tipoAcoes;
}
