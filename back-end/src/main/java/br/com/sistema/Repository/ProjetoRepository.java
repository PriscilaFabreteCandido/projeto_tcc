package br.com.sistema.Repository;

import br.com.sistema.Model.Pessoa;
import br.com.sistema.Model.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjetoRepository extends JpaRepository<Projeto, Long> {
}
