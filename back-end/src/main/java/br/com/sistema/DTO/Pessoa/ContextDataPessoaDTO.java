package br.com.sistema.DTO.Pessoa;

import br.com.sistema.DTO.CursoDTO;
import br.com.sistema.DTO.FuncaoDTO;
import br.com.sistema.DTO.InstituicaoDTO;
import lombok.Data;
import java.util.List;

@Data
public class ContextDataPessoaDTO {
    private List<FuncaoDTO> funcoes;
    private List<InstituicaoDTO> instituicoes;
    private List<CursoDTO> cursos;


}
