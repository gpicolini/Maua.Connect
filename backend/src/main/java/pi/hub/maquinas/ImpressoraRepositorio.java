package pi.hub.maquinas;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.context.annotation.Profile;

@Profile("!sql-local")
public interface ImpressoraRepositorio extends MongoRepository<Impressora, String> {
    boolean existsByNumeroSerie(String numeroSerie);
}
