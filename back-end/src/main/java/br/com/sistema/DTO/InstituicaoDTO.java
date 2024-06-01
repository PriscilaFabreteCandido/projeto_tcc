package br.com.sistema.DTO;

import lombok.Data;

@Data
public class InstituicaoDTO {

    private Long id;
    private String nome;
    private String estado;
    private String cep;
    private String bairro;
    private String rua;
    private String numero;
    private String descricao;
    private String email;
    private String telefone;
    private String tipoInstituicao;


}
