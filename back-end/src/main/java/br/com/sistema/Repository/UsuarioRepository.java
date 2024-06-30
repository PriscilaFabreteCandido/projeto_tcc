package br.com.sistema.Repository;

import br.com.sistema.DTO.UsuarioDTO;
import br.com.sistema.Model.Turma;
import br.com.sistema.Model.Usuario;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByUsuarioAndSenha(String usuario, String senha);
    Usuario findByUsuario(String usuario);
}
