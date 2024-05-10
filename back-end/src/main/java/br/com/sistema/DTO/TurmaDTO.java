package br.com.sistema.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

public record TurmaDTO(
        Long id,
        @NotBlank String nome) {

    public TurmaDTO(Long id, TurmaDTO turma) {
        this(id, turma.nome());
    }

}

