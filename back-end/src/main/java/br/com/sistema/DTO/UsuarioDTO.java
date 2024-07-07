package br.com.sistema.DTO;

import br.com.sistema.DTO.Pessoa.PessoaDTO;
import lombok.Data;

@Data
public class UsuarioDTO {
    private Long id;
    private String login;
    private String password;

}
