package pi.hub.cosmos;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.azure.cosmos.CosmosClient;
import com.azure.cosmos.CosmosClientBuilder;
import com.azure.cosmos.CosmosContainer;
import io.github.cdimascio.dotenv.Dotenv;

@Configuration
public class CosmosConfig {
    private final Dotenv dotenv = Dotenv.load();
    String endpoint = dotenv.get("COSMOS_ENDPOINT");
    String cosmosKey = dotenv.get("COSMOS_KEY");
    String cosmosDatabase = dotenv.get("COSMOS_DATABASE");
    String cosmosContainer = dotenv.get("COSMOS_CONTAINER");


@Bean(destroyMethod = "close")
public CosmosClient cosmosClient() {
    return new CosmosClientBuilder()
            .endpoint(endpoint)
            .key(cosmosKey)
            .gatewayMode()
            .buildClient();
}



public CosmosContainer cosmosContainer(CosmosClient usuariosCosmos) {
    CosmosContainer usuarios = usuariosCosmos
            .getDatabase(cosmosDatabase)
            .getContainer(cosmosContainer);

    usuarios.read();

    System.out.println("Conexão com o Azure Cosmos DB estabelecida!");

    return usuarios;

}

}
