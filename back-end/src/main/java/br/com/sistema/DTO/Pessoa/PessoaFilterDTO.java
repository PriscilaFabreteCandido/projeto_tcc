package br.com.sistema.DTO.Pessoa;


import lombok.Data;

@Data
public class PessoaFilterDTO {
    private String nome;
    private String cpf;
    private String matricula;
}
