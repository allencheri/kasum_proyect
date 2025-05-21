package kasum.backend.allenFeli.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kasum.backend.allenFeli.domain.model.Usuario;
import kasum.backend.allenFeli.repository.UsuarioRepository;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> obtenerTodosUsuarios() {
        return usuarioRepository.findAll();
    }
     public Usuario obtenerUsuarioPorId(Long id) throws RuntimeException {
        return usuarioRepository.findById(id).orElseThrow(()-> new RuntimeException("usuario no encontrado") );
    }
    public void grabarUsuario(Usuario usuario) {
        usuarioRepository.save(usuario);
    }
    public Usuario actualizarUsuario(Usuario usuario) throws RuntimeException {
        obtenerUsuarioPorId(usuario.getId());
        return usuarioRepository.save(usuario);
    }
    public void eliminarUsuario(Long id)  throws RuntimeException {
        obtenerUsuarioPorId(id);
        usuarioRepository.deleteById(id);
    }

}
