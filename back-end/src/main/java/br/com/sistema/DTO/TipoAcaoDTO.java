package br.com.sistema.DTO;

import br.com.sistema.Model.Acao;
import jakarta.persistence.*;
import lombok.Data;


@Data
public class TipoAcaoDTO {

    private Long id;
    private String nome;
    private String icone;
    //private List<AcaoDTO> acoes = new ArrayList<>();

}
