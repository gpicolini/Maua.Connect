package pi.hub.cosmos.usuarios;

import com.azure.cosmos.CosmosContainer;
import com.azure.cosmos.models.CosmosQueryRequestOptions;
import com.azure.cosmos.models.SqlParameter;
import com.azure.cosmos.models.SqlQuerySpec;
import com.azure.cosmos.models.PartitionKey;
import com.azure.cosmos.models.CosmosItemRequestOptions;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public class UsuariosConfig {
    private final CosmosContainer usuariosContainer;
    
    public UsuariosConfig(CosmosContainer usuariosContainer) {
        this.usuariosContainer = usuariosContainer;
    }

public Optional<Usuarios> buscarPorEmail(String email) {
    SqlQuerySpec consulta = new SqlQuerySpec("SELECT * FROM c WHERE STRINGEQUALS(c.emailInstitucional, @email, true)", List.of (new SqlParameter("@email", email.trim())));


return usuariosContainer.queryItems(consulta, new CosmosQueryRequestOptions(), Usuarios.class)
        .stream()
        .findFirst();
    }

public void salvar(Usuarios usuario) {
    usuariosContainer.createItem(usuario, new PartitionKey(usuario.getId()), new CosmosItemRequestOptions());
    }

}