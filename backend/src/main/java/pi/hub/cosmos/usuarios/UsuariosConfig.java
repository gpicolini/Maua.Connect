package pi.hub.cosmos.usuarios;

import com.azure.cosmos.CosmosContainer;
import com.azure.cosmos.CosmosException;
import com.azure.cosmos.models.CosmosItemRequestOptions;
import com.azure.cosmos.models.CosmosQueryRequestOptions;
import com.azure.cosmos.models.PartitionKey;
import com.azure.cosmos.models.SqlParameter;
import com.azure.cosmos.models.SqlQuerySpec;
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
    SqlQuerySpec consulta = new SqlQuerySpec("SELECT * FROM c WHERE STRINGEQUALS(c.emailInstitucional, @email, true)", List.of(new SqlParameter("@email", email.trim()))
    );

    return usuariosContainer
        .queryItems(consulta, new CosmosQueryRequestOptions(), Usuarios.class)
        .stream()
        .findFirst();
}

public Optional<Usuarios> buscarPorId(String id) {
    try {
    Usuarios usuario = usuariosContainer
        .readItem(id, new PartitionKey(id), Usuarios.class)
        .getItem();

    return Optional.ofNullable(usuario);

        }
    catch (CosmosException erro) {
        if (erro.getStatusCode() == 404) {
        return Optional.empty();
            }

    throw erro;
        }
    }

    public void salvar(Usuarios usuario) {
        usuariosContainer.createItem(usuario,
        new PartitionKey(usuario.getId()),
        new CosmosItemRequestOptions()
        );
    }
}