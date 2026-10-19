package pi.hub.maquinas;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ImpressoraRepositorio extends MongoRepository<Impressora, String> {
    boolean existsByNumeroSerie(String numeroSerie);
}
