package br.com.sistema.Controller;

import br.com.sistema.DTO.Pessoa.ContextDataPessoaDTO;
import br.com.sistema.DTO.Pessoa.PessoaDTO;
import br.com.sistema.Service.PessoaService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "PessoaController")

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pessoas")
public class PessoaController {

    private final PessoaService pessoaService;

    @PostMapping("/create")
    public ResponseEntity<PessoaDTO> createPessoa(@RequestBody PessoaDTO pessoaDTO) {
        return new ResponseEntity<>(pessoaService.create(pessoaDTO), HttpStatus.OK);
    }

    @PostMapping("/contextData")
    public ResponseEntity<ContextDataPessoaDTO> getContextData() {
        return new ResponseEntity<>(pessoaService.getContextData(), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PessoaDTO> updatePessoa(@RequestBody PessoaDTO pessoaDTO, @PathVariable Long id) {
        return new ResponseEntity<>(pessoaService.update(pessoaDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<PessoaDTO> deletePessoa(@PathVariable Long id) {
        pessoaService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //=============================================================================================

    @GetMapping("/{id}")
    public ResponseEntity<PessoaDTO> findPessoaById(@PathVariable Long id) {
        return new ResponseEntity<>(pessoaService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<PessoaDTO>> findAllPessoas() {
        List<PessoaDTO> pessoaDTOList = pessoaService.findAll();
        return new ResponseEntity<>(pessoaDTOList, pessoaDTOList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }

}
