package br.com.sistema.DTO;

import br.com.sistema.Model.Pessoa;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class FuncaoDTO {

    private Long id;

    private String nome;

    private List<PessoaDTO> pessoas = new ArrayList<>();

}
