package pi.hub.entrada.login;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;


@RestController @RequestMapping ("/api/entrada")
public class LoginControlador {
  
    @PostMapping("/login")
    public ResponseEntity<String> login (@Valid @RequestBody LoginRequisicao login) {
    
  return ResponseEntity
                .status(501)
                .body("Autenticação ainda não conectada ao armazenamento");

}

}
