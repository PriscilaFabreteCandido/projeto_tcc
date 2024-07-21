package br.com.sistema.DTO;

import br.com.sistema.DTO.Acao.AcaoDTO;
import lombok.Data;

@Data
public class DocumentoDTO {
    private String nome;
    private Long id;
    private String conteudo;
    private String tipo;

}
