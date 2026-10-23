package pi.hub.maquinas;

import java.time.Instant;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Profile("!sql-local") @RestController @RequestMapping("/subindoTeste/maquinas") @CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:8082", "http://127.0.0.1:8082"}, allowCredentials = "true")
public class ImpressoraControlador {
    private final ImpressoraRepositorio repositorio;

    public ImpressoraControlador(ImpressoraRepositorio repositorio) {
        this.repositorio = repositorio;
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody Impressora impressora) {
        if (vazio(impressora.getNome()) || vazio(impressora.getFabricante()) || vazio(impressora.getModelo())
                || vazio(impressora.getTecnologia()) || impressora.getVolume() == null
                || impressora.getVolume().getX() == null || impressora.getVolume().getY() == null
                || impressora.getVolume().getZ() == null || impressora.getMateriais() == null
                || impressora.getMateriais().isEmpty() || vazio(impressora.getInstituicao())
                || vazio(impressora.getCidade()) || vazio(impressora.getUf())
                || impressora.getHorasSemana() == null || vazio(impressora.getStatus())) {
            return ResponseEntity.badRequest().body("Preencha os campos obrigatórios da impressora.");
        }
        if (impressora.getNumeroSerie() != null && !impressora.getNumeroSerie().isBlank()
                && repositorio.existsByNumeroSerie(impressora.getNumeroSerie())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Já existe uma impressora cadastrada com esse número de série.");
        }
        Instant agora = Instant.now();
        impressora.setId(null);
        impressora.setCriadoEm(agora);
        impressora.setAtualizadoEm(agora);
        if (impressora.getHomologacao() == null || impressora.getHomologacao().isBlank()) {
            impressora.setHomologacao("PENDENTE");
        }
        Impressora salva = repositorio.save(impressora);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "mensagem", "Máquina registrada com sucesso!", "id", salva.getId()));
    }

    @GetMapping
    public List<Impressora> listar() {
        return repositorio.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Impressora> buscarPorId(@PathVariable String id) {
        return repositorio.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable String id, @RequestBody Impressora dados) {
        return repositorio.findById(id).map(atual -> {
            atual.setNome(dados.getNome());
            atual.setFabricante(dados.getFabricante());
            atual.setModelo(dados.getModelo());
            atual.setTecnologia(dados.getTecnologia());
            atual.setNumeroSerie(dados.getNumeroSerie());
            atual.setVolume(dados.getVolume());
            atual.setDiametroBico(dados.getDiametroBico());
            atual.setResolucaoCamada(dados.getResolucaoCamada());
            atual.setMateriais(dados.getMateriais());
            atual.setInstituicao(dados.getInstituicao());
            atual.setCidade(dados.getCidade());
            atual.setUf(dados.getUf());
            atual.setHorasSemana(dados.getHorasSemana());
            atual.setStatus(dados.getStatus());
            atual.setHomologacao(dados.getHomologacao());
            atual.setObservacoes(dados.getObservacoes());
            atual.setAtualizadoEm(Instant.now());
            return ResponseEntity.ok(repositorio.save(atual));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    private boolean vazio(String valor) {
        return valor == null || valor.isBlank();
    }
}
