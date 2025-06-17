package kasum.backend.allenFeli.controller;

import kasum.backend.allenFeli.domain.dto.LoginDto;
import kasum.backend.allenFeli.domain.dto.RegistroDto;
import kasum.backend.allenFeli.domain.model.Rol;
import kasum.backend.allenFeli.domain.model.Usuario;

import kasum.backend.allenFeli.repository.UsuarioRepository;
import kasum.backend.allenFeli.service.UsuarioService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/kubera/auth")
public class AutenticadorController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginRequest) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(auth);

        Usuario usuario = usuarioRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Map<String, Object> response = new HashMap<>();
        response.put("id", usuario.getId());
        response.put("nombre", usuario.getNombre());
        response.put("email", usuario.getEmail());

        return ResponseEntity.ok(response);

    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario nuevoUsuario) {
        if (usuarioRepository.findByEmail(nuevoUsuario.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email ya en uso");
        }
        usuarioService.grabarUsuario(nuevoUsuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);

    }

}
