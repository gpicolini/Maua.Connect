package pi.hub.entrada.usuarios;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UsuariosRepositorio {
    private final JdbcTemplate jdbc;

    public UsuariosRepositorio(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public void salvar(String nome, String email, String senhaHash) {
        String sql = "INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)";
        jdbc.update(sql, nome, email, senhaHash);
    }
}
