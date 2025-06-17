package kasum.backend.allenFeli.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import kasum.backend.allenFeli.domain.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    Optional<Usuario> findByEmail(String email);
}
