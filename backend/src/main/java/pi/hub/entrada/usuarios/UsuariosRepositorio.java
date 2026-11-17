package pi.hub.entrada.usuarios;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public class UsuariosRepositorio
{
    private final JdbcTemplate jdbc;

    public UsuariosRepositorio(JdbcTemplate jdbc)
    {
        this.jdbc = jdbc;
    }

    
    public void salvar(String nome, String email, String senhaHash)
    {
        String sql = "INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)";
        jdbc.update(sql, nome, email, senhaHash);
    }

    public record UsuarioLogin
    (
    String nome,
    String email,
    String senhaHash
    )  {}

    
public Optional<UsuarioLogin> buscarPorEmail(String email)
    {
    String sql = """
        SELECT nome, email, senha_hash
        FROM usuarios
        WHERE email = ?
        """;

    return jdbc.query
    (
        sql,
        (resultado, linha) -> new UsuarioLogin(
            resultado.getString("nome"),
            resultado.getString("email"),
            resultado.getString("senha_hash")
        ),
        email
    ) .stream().findFirst();
    }

}
