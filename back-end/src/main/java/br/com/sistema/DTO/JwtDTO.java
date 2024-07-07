package br.com.sistema.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtDTO {
    private String accessToken;
}
