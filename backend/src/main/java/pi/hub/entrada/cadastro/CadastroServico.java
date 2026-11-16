package pi.hub.entrada.cadastro;

import java.util.Locale;
import pi.hub.entrada.senha.SenhaHash;
import pi.hub.entrada.usuarios.UsuariosRepositorio;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class CadastroServico {

    private final UsuariosRepositorio usuarios;
    private final SenhaHash senhas;

    public CadastroServico(UsuariosRepositorio usuarios, SenhaHash senhas) {
        this.usuarios = usuarios;
        this.senhas = senhas;
    }

    public void cadastrar(CadastroRequisicao dados) {
        if (!dados.getSenha().equals(dados.getConfirmarSenha())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
            "As senhas não coincidem."
            );
        }

        String hash;

        try {
            hash = senhas.gerarHash(dados.getSenha());
        } catch (IllegalArgumentException erro) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,erro.getMessage()
            );
        }

        usuarios.salvar(dados.getNome().trim(), dados.getEmail().trim().toLowerCase(Locale.ROOT), hash);
    }
}
