package br.com.sistema.Repository;

import br.com.sistema.Model.Curso;
import br.com.sistema.Model.Funcao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {
}
