package br.com.sistema.DTO.Acao;

import br.com.sistema.DTO.*;
import br.com.sistema.DTO.Pessoa.PessoaDTO;
import br.com.sistema.Model.Pessoa;
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
    private List<FuncaoDTO> funcoes;
    private List<PessoaDTO> pessoas;
}
