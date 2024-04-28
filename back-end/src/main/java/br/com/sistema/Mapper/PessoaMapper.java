package br.com.sistema.Mapper;

import br.com.sistema.DTO.PessoaDTO;
import br.com.sistema.Model.Pessoa;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PessoaMapper extends EntityMapper<PessoaDTO, Pessoa> {
}