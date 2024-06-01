package br.com.sistema.DTO.Pessoa;

import br.com.sistema.DTO.CursoDTO;
import br.com.sistema.DTO.FuncaoDTO;
import br.com.sistema.DTO.InstituicaoDTO;
import br.com.sistema.DTO.VinculoDTO;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ContextDataPessoaDTO {
    private List<FuncaoDTO> funcoes = new ArrayList<>();
    private List<InstituicaoDTO> instituicoes = new ArrayList<>();
    private List<CursoDTO> cursos = new ArrayList<>();


}
