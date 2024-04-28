package br.com.sistema.Mapper;

import br.com.sistema.DTO.InstituicaoDTO;
import br.com.sistema.DTO.ProjetoDTO;
import br.com.sistema.Model.Instituicao;
import br.com.sistema.Model.Projeto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProjetoMapper extends EntityMapper<ProjetoDTO, Projeto> {
}