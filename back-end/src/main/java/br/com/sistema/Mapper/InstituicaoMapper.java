package br.com.sistema.Mapper;

import br.com.sistema.DTO.FuncaoDTO;
import br.com.sistema.DTO.InstituicaoDTO;
import br.com.sistema.Model.Funcao;
import br.com.sistema.Model.Instituicao;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InstituicaoMapper extends EntityMapper<InstituicaoDTO, Instituicao> {
}