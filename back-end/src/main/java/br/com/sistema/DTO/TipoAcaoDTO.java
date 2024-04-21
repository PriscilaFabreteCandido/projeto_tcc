package br.com.sistema.DTO;

import br.com.sistema.Model.Acao;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class TipoAcaoDTO {

    private Long id;
    private String nome;
    private List<AcaoDTO> acoes = new ArrayList<>();

}
