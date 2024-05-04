package br.com.sistema.Mapper;

import br.com.sistema.DTO.CursoDTO;
import br.com.sistema.DTO.VinculoDTO;
import br.com.sistema.Model.Curso;
import br.com.sistema.Model.Vinculo;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface VinculoMapper extends EntityMapper<VinculoDTO, Vinculo> {
}