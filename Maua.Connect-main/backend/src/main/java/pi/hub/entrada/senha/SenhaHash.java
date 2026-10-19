package pi.hub.entrada.senha;

import java.nio.charset.StandardCharsets;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SenhaHash {

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    public String gerarHash(String senha) {
        if (senha == null || senha.isBlank()) {
            throw new IllegalArgumentException("A senha é obrigatória.");
        }

        if (senha.getBytes(StandardCharsets.UTF_8).length > 70) {
            throw new IllegalArgumentException("A senha está grande demais!");
        }

        return passwordEncoder.encode(senha);
    }

    public boolean verificarHash(String senha, String hash) {
        if (senha == null || hash == null || hash.isBlank() || senha.getBytes(StandardCharsets.UTF_8).length > 70) {
            return false;
        }

        return passwordEncoder.matches(senha, hash);
    }
}