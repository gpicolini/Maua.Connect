package pi.hub.entrada.login;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController @RequestMapping("/api/entrada") @CrossOrigin
(
    origins = {
        "http://localhost:5500",
        "http://127.0.0.1:5500"
    },
    allowCredentials = "true"
)
public class LoginControlador
{

    private final LoginServico loginServico;

    public LoginControlador(LoginServico loginServico)
    {
        this.loginServico = loginServico;
    }

    public record UsuarioResposta(String nome) {}

    @PostMapping("/login")
    public UsuarioResposta login (
        @Valid @RequestBody LoginRequisicao dados,
        HttpServletRequest requisicao
    )
    
    {
        var usuario = loginServico.autenticar(
            dados.getEmail(),
            dados.getSenha()
        );

        var sessaoAnterior = requisicao.getSession(false);

        if (sessaoAnterior != null) {
            sessaoAnterior.invalidate();
        }

        var sessao = requisicao.getSession(true);
        sessao.setAttribute("usuarioEmail", usuario.email());
        sessao.setAttribute("usuarioNome", usuario.nome());
        sessao.setMaxInactiveInterval(30 * 60);

        return new UsuarioResposta(usuario.nome());
    }

    @GetMapping("/sessao")
    public UsuarioResposta consultarSessao(
        HttpServletRequest requisicao
    )
    {
        var sessao = requisicao.getSession(false);

        if (sessao == null || sessao.getAttribute("usuarioEmail") == null)
        {
            throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Faça login para continuar."
            );
        }

        String nome = (String) sessao.getAttribute("usuarioNome");
        return new UsuarioResposta(nome);
    }
}