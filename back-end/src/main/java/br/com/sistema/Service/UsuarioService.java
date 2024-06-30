package br.com.sistema.Service;

import br.com.sistema.DTO.UsuarioDTO;
import br.com.sistema.Mapper.TipoInstituicaoMapper;
import br.com.sistema.Mapper.UsuarioMapper;
import br.com.sistema.Model.Turma;
import br.com.sistema.Model.Usuario;
import br.com.sistema.Repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    };
    @Autowired
    private UsuarioRepository repository;
    private final UsuarioMapper mapper;

    public UsuarioDTO create(UsuarioDTO usuarioDTO){
        Usuario usuario = repository.findByUsuario(usuarioDTO.getUsuario());

        if(usuario != null){
            throw new Error("Usuário já existe");
        }

        Usuario entity = mapper.toEntity(usuarioDTO);

        entity.setSenha(passwordEncoder().encode(usuarioDTO.getSenha()));
        repository.save(entity);
        return mapper.toDto(entity);
    }

    public UsuarioDTO update(UsuarioDTO usuarioDTO, Long id) {
        findById(id);

        Usuario entity = mapper.toEntity(usuarioDTO);
        entity.setId(id);
        entity.setSenha(passwordEncoder().encode(usuarioDTO.getSenha())); // Encrypt the password if it's updated
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id) {
        Usuario entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário com ID '" + id + "' não encontrado."));
        repository.delete(entity);
    }

    public UsuarioDTO findById(Long id) {
        Usuario entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário com ID '" + id + "' não encontrado."));
        return mapper.toDto(entity);
    }

    public List<UsuarioDTO> findAll() {
        return mapper.toDto(repository.findAll());
    }

}
