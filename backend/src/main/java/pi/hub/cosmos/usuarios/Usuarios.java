package pi.hub.cosmos.usuarios;

public class Usuarios {
    private String id;
    private String nome;
    private String emailInstitucional;
    private String senhaHash;
    private String perfil;
    private boolean ativo;
    private String dataCriacao;

    public Usuarios() {
    }

    public Usuarios(
        String id,
        String nome,
        String emailInstitucional,
        String senhaHash,
        String perfil,
        boolean ativo,
        String dataCriacao) {


            this.id = id;
            this.nome = nome;
            this.emailInstitucional = emailInstitucional;
            this.senhaHash = senhaHash;
            this.perfil = perfil;
            this.ativo = ativo;
            this.dataCriacao = dataCriacao;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmailInstitucional() {
        return emailInstitucional;
    }

    public void setEmailInstitucional(String emailInstitucional) {
        this.emailInstitucional = emailInstitucional;
    }

    public String getSenhaHash() {
        return senhaHash;
    }

    public void setSenhaHash(String senhaHash) {
        this.senhaHash = senhaHash;
    }

    public String getPerfil() {
        return perfil;
    }

    public void setPerfil(String perfil) {
        this.perfil = perfil;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public String getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(String dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
}

