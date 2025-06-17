package kasum.backend.allenFeli.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import kasum.backend.allenFeli.domain.model.Usuario;
import kasum.backend.allenFeli.repository.UsuarioRepository;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Usuario> obtenerTodosUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario obtenerUsuarioPorId(Long id) throws RuntimeException {
        return usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("usuario no encontrado"));
    }

    public Usuario grabarUsuario(Usuario usuario) {
        String passCrypted = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(passCrypted);
        try {
            return usuarioRepository.save(usuario);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("No se pudo guardar el usuario: posible violación de integridad", e);
        }
    }

    public Usuario actualizarUsuario(Usuario usuario) throws RuntimeException {
        obtenerUsuarioPorId(usuario.getId());
        String passCrypted = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(passCrypted);
        return usuarioRepository.save(usuario);
    }

    public void eliminarUsuario(Long id) throws RuntimeException {
        obtenerUsuarioPorId(id);
        usuarioRepository.deleteById(id);
    }

}
