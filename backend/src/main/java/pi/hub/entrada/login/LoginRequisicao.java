package pi.hub.entrada.login;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class LoginRequisicao {

    @Email
    @NotBlank
    private String email;
    

    @NotBlank
    private String senha;

    

public LoginRequisicao() {
    }

public LoginRequisicao(
    
    String email,
    String senha) {

    this.email = email;
    this.senha = senha;


}

public String getEmail() {
    return email;
}

public void setEmail(String email) {
    this.email = email;
}

public String getSenha() {
    return senha;
}

public void setSenha(String senha) {
    this.senha = senha;
}
}




