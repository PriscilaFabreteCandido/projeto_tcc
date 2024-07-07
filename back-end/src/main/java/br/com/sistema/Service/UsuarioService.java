package br.com.sistema.Service;

import br.com.sistema.Config.TokenService;
import br.com.sistema.DTO.UsuarioDTO;
import br.com.sistema.Mapper.UsuarioMapper;
import br.com.sistema.Model.Usuario;
import br.com.sistema.Repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService implements UserDetailsService {

    @Autowired
    private UsuarioRepository repository;

    private final UsuarioMapper mapper;

    @Autowired
    private TokenService tokenService;


    public UsuarioDTO create(UsuarioDTO usuarioDTO) {
        Usuario usuario = repository.findByLogin(usuarioDTO.getLogin());

        if (usuario != null) {
            throw new Error("Usuário já existe");
        }

        Usuario entity = new Usuario();
        entity.setLogin(usuarioDTO.getLogin());
        entity.setId(1L);
        var senhaCript = new BCryptPasswordEncoder().encode(usuarioDTO.getPassword());
        entity.setPassword(senhaCript);
        repository.save(entity);
        return usuarioDTO;
    }

    public UsuarioDTO update(UsuarioDTO usuarioDTO, Long id) {
        findById(id);

        Usuario entity = mapper.toEntity(usuarioDTO);
        entity.setId(id);
        var senhaCript = new BCryptPasswordEncoder().encode(usuarioDTO.getPassword());
        entity.setPassword(senhaCript);
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

//    public LoginDTO login(String usuario, String senha, AuthenticationManager authenticationManager) {
//
//        var authToken = new UsernamePasswordAuthenticationToken(usuario, senha);
//        var auth =  authenticationManager.authenticate(authToken);
//
//        var token = tokenService.generateToken((Usuario) auth.getPrincipal());
//        var loginToken = new LoginDTO(token);
//        return loginToken;
//    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByLogin(username);
    }
}
