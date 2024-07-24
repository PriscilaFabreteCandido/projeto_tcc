package br.com.sistema.DTO.Acao;


import lombok.Data;

@Data
public class AcaoResultRelatorioDTO {
    private Long id;
    private String nome;
    private long ano;
    private String tipoAcao;
    private Long projetoId;
    private Long eventoId;

}
