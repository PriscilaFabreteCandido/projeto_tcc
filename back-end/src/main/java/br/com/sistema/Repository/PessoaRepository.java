package br.com.sistema.Repository;

import br.com.sistema.Model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Long> {

    @Query("SELECT p FROM Pessoa p WHERE " +
            "(:nome IS NULL OR LOWER(p.nome) LIKE LOWER(CONCAT('%', :nome, '%'))) AND " +
            "(:cpf IS NULL OR p.cpf = :cpf) AND " +
            "(:matricula IS NULL OR p.matricula = :matricula)")
    List<Pessoa> findByFilters(@Param("nome") String nome,
                               @Param("cpf") String cpf,
                               @Param("matricula") String matricula);
}
