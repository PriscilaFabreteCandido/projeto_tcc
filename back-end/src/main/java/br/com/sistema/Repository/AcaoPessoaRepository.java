package br.com.sistema.Repository;

import br.com.sistema.Model.AcaoPessoa;
import br.com.sistema.Model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcaoPessoaRepository extends JpaRepository<AcaoPessoa, Long> {
}
