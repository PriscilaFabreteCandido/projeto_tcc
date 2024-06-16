package br.com.sistema.Model;

import br.com.sistema.Enum.FormatoAcademicoEnum;
import br.com.sistema.Enum.PeriodoSemestreEnum;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Entity
public class PeriodoAcademico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Integer ano;

    @Temporal(TemporalType.DATE)
    private Date dataInicio;

    @Temporal(TemporalType.DATE)
    private Date dataFim;

    @Enumerated(EnumType.STRING)
    private FormatoAcademicoEnum formato;

    @Enumerated(EnumType.STRING)
    private PeriodoSemestreEnum periodo;

    @OneToMany(mappedBy = "periodo")
    private List<PeriodoAcademico> periodos;


}
