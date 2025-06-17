package kasum.backend.allenFeli.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import kasum.backend.allenFeli.domain.model.Usuario;
import kasum.backend.allenFeli.repository.UsuarioRepository;

@Component 
public class UserDetailsServiceImpl implements UserDetailsService { 

    @Autowired 
    private UsuarioRepository usuarioRepository; 
 
    @Override 
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException { 
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con email: " + email));

        return User                    
            .withUsername(usuario.getEmail()) 
            .password(usuario.getPassword()) 
            .roles(usuario.getRol().toString()) 
            .build(); 
    } 
}
