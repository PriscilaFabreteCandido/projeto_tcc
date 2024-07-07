package br.com.sistema;



import br.com.sistema.Model.Pessoa;
import br.com.sistema.Model.TipoAcao;
import br.com.sistema.Model.Usuario;
import br.com.sistema.Repository.PessoaRepository;
import br.com.sistema.Repository.TipoAcaoRepository;
import br.com.sistema.Repository.UsuarioRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


@Component
public class DataInitializer {

    @Autowired
    private TipoAcaoRepository tipoAcaoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PessoaRepository pessoaRepository;



}
