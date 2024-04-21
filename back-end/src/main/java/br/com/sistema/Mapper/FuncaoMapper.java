package br.com.sistema.Mapper;

import br.com.sistema.DTO.FuncaoDTO;
import br.com.sistema.DTO.PessoaDTO;
import br.com.sistema.Model.Funcao;
import br.com.sistema.Model.Pessoa;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FuncaoMapper extends EntityMapper<FuncaoDTO, Funcao> {
}
