package kasum.backend.allenFeli.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kasum.backend.allenFeli.domain.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
}
