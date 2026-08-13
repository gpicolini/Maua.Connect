package pi.hub.entrada.cadastro;

// isso aqui eh uma parte do material de trabalho que eu to usando nesse arquivo/objeto
import jakarta.validation.Valid; // executa NotBlank, Email e Size antes de entrar na do brincadeira aqui do CadastroRequisicao
import org.springframework.http.ResponseEntity; // monta a resposta HTTP e permite escolher o status.. tipo 200 ou 400 tanto faz
import org.springframework.web.bind.annotation.RequestMapping; // define o endereço-base das rotas da classe, como /api/entrada
import org.springframework.web.bind.annotation.RestController; // avisa ao Spring que essa classe recebe requisições da API e devolve as respostas
import org.springframework.web.bind.annotation.PostMapping; // define uma rota do tipo POST, usada para enviar os dados do cadastro
import org.springframework.web.bind.annotation.RequestBody; // converte o JSON enviado pelo frontend em um objeto que chama CadastroRequisicao

@RestController @RequestMapping("/api/entrada") // Spring vai ser reconhecida na API, por conta disso aqui 
public class CadastroControlador {
    
    @PostMapping ("/cadastro") // envio de dados de cadastro
    public ResponseEntity<String>cadastrar (@Valid @RequestBody CadastroRequisicao cadastro) // Traz o JSON do Frontend aqui no CadastroRequisicao
    {
        if
        (!cadastro.getSenha().equals(cadastro.getConfirmarSenha())) {
        return ResponseEntity.badRequest().body("As senhas não coincidem");
    }        
        return ResponseEntity.ok("Dados de cadastro foram validados");
    }
}
