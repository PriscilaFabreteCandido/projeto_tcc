package br.com.sistema.Mapper;

import br.com.sistema.DTO.Acao.AcaoPessoaDTO;
import br.com.sistema.DTO.CursoDTO;
import br.com.sistema.Model.AcaoPessoa;
import br.com.sistema.Model.Curso;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface AcaoPessoaMappper extends EntityMapper<AcaoPessoaDTO, AcaoPessoa>{
}
