package br.com.sistema.DTO;


import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ProjetoDTO {

    private Long id;
    private String nome;
    private List<AcaoDTO> acoes = new ArrayList<>();

}
