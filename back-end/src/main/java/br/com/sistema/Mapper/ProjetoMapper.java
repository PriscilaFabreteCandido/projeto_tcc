package br.com.sistema.Mapper;

import br.com.sistema.DTO.ProjetoDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProjetoMapper extends EntityMapper<ProjetoDTO, Projeto> {
}