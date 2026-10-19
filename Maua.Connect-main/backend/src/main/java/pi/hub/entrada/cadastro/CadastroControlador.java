package pi.hub.entrada.cadastro;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/entrada")
@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:8082", "http://127.0.0.1:8082"}, allowCredentials = "true")
public class CadastroControlador {

    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrar(@Valid @RequestBody CadastroRequisicao cadastro) {
        if (!cadastro.getSenha().equals(cadastro.getConfirmarSenha())) {
            return ResponseEntity.badRequest().body("As senhas não coincidem.");
        }

        // Este endpoint ainda não persiste usuários. A equipe responsável conectará ao MySQL.
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
                .body("Cadastro de usuários ainda não está conectado ao MySQL. A integração está pendente.");
    }
}
