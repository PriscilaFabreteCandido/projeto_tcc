package br.com.sistema.Controller;

import br.com.sistema.DTO.Instituicao.InstituicaoFilterDTO;
import br.com.sistema.DTO.InstituicaoDTO;
import br.com.sistema.DTO.Pessoa.PessoaDTO;
import br.com.sistema.DTO.Pessoa.PessoaFilterDTO;
import br.com.sistema.Service.InstituicaoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "InstituicaoController")

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/instituicoes")
public class InstituicaoController {

    private final InstituicaoService instituicaoService;

    @PostMapping("/create")
    public ResponseEntity<InstituicaoDTO> createInstituicao(@RequestBody InstituicaoDTO instituicaoDTO) {
        return new ResponseEntity<>(instituicaoService.create(instituicaoDTO), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<InstituicaoDTO> updateInstituicao(@RequestBody InstituicaoDTO instituicaoDTO, @PathVariable Long id) {
        return new ResponseEntity<>(instituicaoService.update(instituicaoDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<InstituicaoDTO> deleteInstituicao(@PathVariable Long id) {
        instituicaoService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //=============================================================================================

    @GetMapping("/{id}")
    public ResponseEntity<InstituicaoDTO> findInstituicaoById(@PathVariable Long id) {
        return new ResponseEntity<>(instituicaoService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<InstituicaoDTO>> findAllInstituicoes() {
        List<InstituicaoDTO> instituicaoDTOList = instituicaoService.findAll();
        return new ResponseEntity<>(instituicaoDTOList, instituicaoDTOList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }

    @PostMapping("/filter")
    public ResponseEntity<List<InstituicaoDTO>> filterInstituicoes(@RequestBody InstituicaoFilterDTO instituicaoFilterDTO) {
        List<InstituicaoDTO> filteredList = instituicaoService.filter(instituicaoFilterDTO);
        return new ResponseEntity<>(filteredList, filteredList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }

}
