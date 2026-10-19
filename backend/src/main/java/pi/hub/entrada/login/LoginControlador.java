package pi.hub.entrada.login;

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
public class LoginControlador {

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginRequisicao dados) {
        // O login será conectado ao MySQL pela equipe responsável por usuários.
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
                .body("Login ainda não está conectado ao MySQL. A integração de usuários está pendente.");
    }
}
