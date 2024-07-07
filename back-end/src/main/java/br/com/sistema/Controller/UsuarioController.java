package br.com.sistema.Controller;

import br.com.sistema.Config.TokenProvider;
import br.com.sistema.Config.TokenService;
import br.com.sistema.DTO.JwtDTO;
import br.com.sistema.DTO.LoginDTO;
import br.com.sistema.DTO.UsuarioDTO;

import br.com.sistema.Model.Usuario;
import br.com.sistema.Service.UsuarioService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.Authenticator;
import java.util.List;

@Tag(name = "UsuarioController")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenProvider tokenService;

    @PostMapping("/create")
    public ResponseEntity<UsuarioDTO> createUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        return new ResponseEntity<>(usuarioService.create(usuarioDTO), HttpStatus.OK);
    }


    @PostMapping("/login")
    public ResponseEntity<JwtDTO> logar(@RequestBody UsuarioDTO usuarioDTO) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(usuarioDTO.getLogin(), usuarioDTO.getPassword());
        var authUser = authenticationManager.authenticate(usernamePassword);
        var accessToken = tokenService.generateAccessToken((Usuario) authUser.getPrincipal());

        return new ResponseEntity<>(new JwtDTO(accessToken), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<UsuarioDTO> updateUsuario(@RequestBody UsuarioDTO usuarioDTO, @PathVariable Long id) {
        return new ResponseEntity<>(usuarioService.update(usuarioDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        usuarioService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> findUsuarioById(@PathVariable Long id) {
        return new ResponseEntity<>(usuarioService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/info")
    public ResponseEntity<UsuarioDTO> getInfoUsuario() {
        return new ResponseEntity<>(usuarioService.getUser(), HttpStatus.OK);
    }


    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> findAllUsuarios() {
        List<UsuarioDTO> usuarioDTOList = usuarioService.findAll();
        return new ResponseEntity<>(usuarioDTOList, usuarioDTOList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }
}
