package br.com.sistema.DTO;

import lombok.Data;

@Data
public class InstituicaoDTO {

    private Long id;

    private String nome;

    private String cep;

    private String bairro;

    private String rua;

    private String numero;

    private String descricao;
    private TipoInstituicaoDTO tipoInstiuicaoDTO;

    //private List<PessoaDTO> pessoas = new ArrayList<>();

    //private List<AcaoDTO> acoes = new ArrayList<>();
}
