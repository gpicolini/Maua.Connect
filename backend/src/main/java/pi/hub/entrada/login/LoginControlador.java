package pi.hub.entrada.login;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import pi.hub.cosmos.usuarios.Usuarios;


@RestController @RequestMapping("/api/entrada")
public class LoginControlador {

  private final LoginServico loginServico;

  public LoginControlador(LoginServico loginServico) {
    this.loginServico = loginServico;
    }

@PostMapping("/login")
public ResponseEntity<Map<String, String>> login(@Valid @RequestBody LoginRequisicao dados, HttpServletRequest requisicao) {

    Usuarios usuario = loginServico.autenticar(dados.getEmail(), dados.getSenha()
    );


    HttpSession sessaoAnterior = requisicao.getSession(false);

        if (sessaoAnterior != null) {
            sessaoAnterior.invalidate();
  }

  
    HttpSession sessao = requisicao.getSession(true);
        sessao.setAttribute("usuarioId", usuario.getId());

        sessao.setMaxInactiveInterval(30 * 60);

        return ResponseEntity.ok(
                Map.of("mensagem", "Login realizado!")
        );
  }
}