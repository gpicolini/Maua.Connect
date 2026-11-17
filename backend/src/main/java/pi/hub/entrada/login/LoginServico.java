package pi.hub.entrada.login;

import java.util.Locale;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pi.hub.entrada.senha.SenhaHash;
import pi.hub.entrada.usuarios.UsuariosRepositorio;
import pi.hub.entrada.usuarios.UsuariosRepositorio.UsuarioLogin;

@Service
public class LoginServico
{
    private final UsuariosRepositorio usuarios;
    private final SenhaHash senhas;
    private final String hashComparacao;

    public LoginServico(UsuariosRepositorio usuarios, SenhaHash senhas)
    {
        this.usuarios = usuarios;
        this.senhas = senhas;
        this.hashComparacao = senhas.gerarHash(
            UUID.randomUUID().toString()
        );
    }

    public UsuarioLogin autenticar(String email, String senha)
    {
        String emailNormalizado = email.trim().toLowerCase(Locale.ROOT);
        var resultado = usuarios.buscarPorEmail(emailNormalizado);

        String hash = hashComparacao;

        if (resultado.isPresent())
            hash = resultado.get().senhaHash();

        boolean senhaCorreta = senhas.verificarHash(senha, hash);

        if (resultado.isEmpty() || !senhaCorreta)
        {
            throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "E-mail ou senha inválidos."
            );
        }

        return resultado.get();
    }
}

 

