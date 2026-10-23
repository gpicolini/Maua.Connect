package pi.hub.entrada.cadastro;

// isso aqui eh uma parte do material de trabalho que eu to usando nesse arquivo/objeto
import org.springframework.http.ResponseEntity; // monta a resposta HTTP
import org.springframework.web.bind.annotation.PostMapping; // recebe requisições POST
import org.springframework.web.bind.annotation.RequestBody; // recebe o JSON do frontend
import org.springframework.web.bind.annotation.RequestMapping; // define o endereço-base
import org.springframework.web.bind.annotation.RestController; // registra o controlador da API
import jakarta.validation.Valid; // valida os campos recebidos

@RestController
@RequestMapping("/api/entrada") // endereço-base das rotas
public class CadastroControlador {

    private final CadastroServico cadastroServico; // serviço responsável pelo cadastro

    public CadastroControlador(CadastroServico cadastroServico) {
        this.cadastroServico = cadastroServico; // recebe o serviço pelo Spring
    }

    @PostMapping("/cadastro") // rota para cadastrar
    public ResponseEntity<String> cadastrar(@Valid @RequestBody CadastroRequisicao cadastro) {

        cadastroServico.cadastrar(cadastro); // valida, gera o hash e salva no banco

        return ResponseEntity.status(201)
            .body("Cadastro realizado com sucesso!"); // responde que o cadastro foi criado
    }
}