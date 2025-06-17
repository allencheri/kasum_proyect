package kasum.backend.allenFeli.domain.dto;

import kasum.backend.allenFeli.domain.model.Rol;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistroDto {
    private String nombre;
    private String apellido;
    private String email;
    private String password;
    private String rol; // mirar en el enum Rol que tipos hay
}
