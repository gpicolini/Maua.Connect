package pi.hub.entrada.cadastro;

// isso aqui eh uma parte do material de trabalho que eu to usando nesse arquivo/objeto
import jakarta.validation.constraints.Email;  // verifica se tem email o texto escrito
import jakarta.validation.constraints.NotBlank; // impede texto vazio
import jakarta.validation.constraints.Size; // define tamanho permitido na senha..

// essa classe poem as strings pra requerir o cadastro.. aqui vai ser onde receberemos os dados do frontend... quem mexer nessa poha vai ganhar um presentinho //
public class CadastroRequisicao {
    
    @NotBlank // nao pode texto vazio aqui
    private String nome;

    @Email
    @NotBlank // nao pode texto vazio aqui tambem e tambem cobra formato de email
    private String email;
    
    @NotBlank
    @Size (min = 8) // nao pode texto vazio, e tambem to cobrando tamanho da senha.. no caso, 8 caracteres
    private String senha;

    @NotBlank // nao pode texto vazio aqui tambemm
    private String confirmarSenha;

    @NotBlank // muito menos aqui, nao enfia texto vazio nessa poha
    private String tipoUsuario;
    
    
public CadastroRequisicao() {
    }
    
    
public CadastroRequisicao(
        String nome,
        String email,
        String senha,
        String confirmarSenha,
        String tipoUsuario) {
            
            this.nome = nome;
            this.email = email;
            this.senha = senha;
            this.confirmarSenha = confirmarSenha;
            this.tipoUsuario = tipoUsuario;
            
        }

// aqui tao os getters e os setters eles permitem que o Spring leia e preencha os dados recebidos... qlqr bgl pergunta no grupo q eu explico //
        public String getNome() {
            return nome;
        }
    
        public void setNome(String nome) {
            this.nome = nome;
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
    
        public String getConfirmarSenha() {
            return confirmarSenha;
        }
    
        public void setConfirmarSenha(String confirmarSenha) {
            this.confirmarSenha = confirmarSenha;
        }

        public String getTipoUsuario() {
            return tipoUsuario;
        }
    
        public void setTipoUsuario(String tipoUsuario) {
            this.tipoUsuario = tipoUsuario;
        }
    }
    
    
    
    
    

