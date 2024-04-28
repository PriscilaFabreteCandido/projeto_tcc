package br.com.sistema.Repository;

import br.com.sistema.Model.Funcao;
import br.com.sistema.Model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FuncaoRepository extends JpaRepository<Funcao, Long> {
}
