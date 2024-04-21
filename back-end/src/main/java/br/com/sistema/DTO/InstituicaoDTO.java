package br.com.sistema.DTO;

import br.com.sistema.Model.Acao;
import br.com.sistema.Model.Pessoa;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class InstituicaoDTO {

    private Long id;

    private String nome;

    private String cep;

    private String avenida;

    private String rua;

    private String numero;

    private String descricao;

    private List<PessoaDTO> pessoas = new ArrayList<>();

    private List<AcaoDTO> acoes = new ArrayList<>();
}
