package br.com.sistema.DTO;

import br.com.sistema.Model.Funcao;
import br.com.sistema.Model.Instituicao;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;

import java.util.Date;

@Data
public class PessoaDTO {

    private Long id;
    private String nome;
    private String cpf;

    @Email(message = "O e-mail fornecido é inválido.")
    private String email;

    private String senha;
    private String matricula;
    private String nivelEscolaridade;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT-3")
    private Date dtNascimento;

    private FuncaoDTO funcao;
    private InstituicaoDTO instituicao;
}
