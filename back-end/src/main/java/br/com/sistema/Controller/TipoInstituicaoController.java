package br.com.sistema.Controller;

import br.com.sistema.DTO.TipoAcaoDTO;
import br.com.sistema.DTO.TipoInstituicaoDTO;
import br.com.sistema.Service.TipoAcaoService;
import br.com.sistema.Service.TipoInstituicaoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@Tag(name = "TipoInstituicaoController")

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tipoInstituicoes")
public class TipoInstituicaoController {
    private final TipoInstituicaoService tipoInstituicaoService;

    @GetMapping
    public ResponseEntity<List<TipoInstituicaoDTO>> findAllTiposInstituicoes() {
        List<TipoInstituicaoDTO> tipoAcaoDTOList = tipoInstituicaoService.findAll();
        return new ResponseEntity<>(tipoAcaoDTOList, tipoAcaoDTOList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }
}
