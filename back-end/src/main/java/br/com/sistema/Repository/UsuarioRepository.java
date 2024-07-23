package br.com.sistema.Repository;

import br.com.sistema.DTO.UsuarioDTO;
import br.com.sistema.Model.Turma;
import br.com.sistema.Model.Usuario;
import jakarta.transaction.Transactional;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    UserDetails findByLoginAndPassword(String usuario, String senha);
    Usuario findByLogin(String usuario);
     @Query("SELECT u FROM users u JOIN FETCH u.pessoa")
    List<Usuario> retrieveAll();

}
