package pi.hub.entrada.login;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pi.hub.cosmos.usuarios.Usuarios;
import pi.hub.cosmos.usuarios.UsuariosConfig;
import pi.hub.entrada.senha.SenhaHash;


@Service
public class LoginServico {
    private UsuariosConfig usuarios;
    private SenhaHash senhas;
    private String hashComparacao;

public LoginServico (UsuariosConfig usuarios, SenhaHash senhas) {
    this.usuarios = usuarios;
    this.senhas = senhas;
    this.hashComparacao = senhas.gerarHash(java.util.UUID.randomUUID().toString());
}

public Usuarios autenticar (String email, String senha) {
    var resultado = usuarios.buscarPorEmail(email);
    String hash = resultado.map (Usuarios::getSenhaHash)
    .orElse (hashComparacao);


boolean senhaCorreta = senhas.verificarHash (senha, hash);
if (resultado.isEmpty() || !senhaCorreta) {
    throw acessoNegado();
}

Usuarios usuario = resultado.get();
if (!usuario.isAtivo()) {
    throw acessoNegado();
}

return usuario;

}

private ResponseStatusException acessoNegado() {
    
    return new ResponseStatusException(HttpStatus.UNAUTHORIZED , "email ou senha inválidos");

}
}
