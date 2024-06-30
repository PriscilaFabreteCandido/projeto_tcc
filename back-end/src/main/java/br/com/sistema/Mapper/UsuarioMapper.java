package br.com.sistema.Mapper;

import br.com.sistema.DTO.TurmaDTO;
import br.com.sistema.DTO.UsuarioDTO;
import br.com.sistema.Model.Turma;
import br.com.sistema.Model.Usuario;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UsuarioMapper extends EntityMapper<UsuarioDTO, Usuario> {
}
