package pi.hub.maquinas;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "impressoras")
public class Impressora {
    @Id
    private String id;
    private String nome;
    private String fabricante;
    private String modelo;
    private String tecnologia;
    private String numeroSerie;
    private Volume volume;
    private Double diametroBico;
    private Double resolucaoCamada;
    private List<String> materiais = new ArrayList<>();
    private String instituicao;
    private String cidade;
    private String uf;
    private Integer horasSemana;
    private String status;
    private String homologacao;
    private String observacoes;
    private Instant criadoEm = Instant.now();
    private Instant atualizadoEm = Instant.now();

public Impressora() {}


public String getId() { return id; }

public void setId(String id) { this.id = id; }

public String getNome() { return nome; }

public void setNome(String nome) { this.nome = nome; }
    
public String getFabricante() { return fabricante; }
    
public void setFabricante(String fabricante) { this.fabricante = fabricante; }
    
public String getModelo() { return modelo; }
    
public void setModelo(String modelo) { this.modelo = modelo; }
    
public String getTecnologia() { return tecnologia; }
    
public void setTecnologia(String tecnologia) { this.tecnologia = tecnologia; }

public String getNumeroSerie() { return numeroSerie; }
    
public void setNumeroSerie(String numeroSerie) { this.numeroSerie = numeroSerie; }
    
public Volume getVolume() { return volume; }
    
public void setVolume(Volume volume) { this.volume = volume; }
    
public Double getDiametroBico() { return diametroBico; }
    
public void setDiametroBico(Double diametroBico) { this.diametroBico = diametroBico; }

public Double getResolucaoCamada() { return resolucaoCamada; }
    
public void setResolucaoCamada(Double resolucaoCamada) { this.resolucaoCamada = resolucaoCamada; }
    
public List<String> getMateriais() { return materiais; }
    
public void setMateriais(List<String> materiais) { this.materiais = materiais == null ? new ArrayList<>() : materiais; }
    
public String getInstituicao() { return instituicao; }
    
public void setInstituicao(String instituicao) { this.instituicao = instituicao; }

public String getCidade() { return cidade; }
    
public void setCidade(String cidade) { this.cidade = cidade; }
    
public String getUf() { return uf; }
    
public void setUf(String uf) { this.uf = uf; }
    
public Integer getHorasSemana() { return horasSemana; }
    
public void setHorasSemana(Integer horasSemana) { this.horasSemana = horasSemana; }
    
public String getStatus() { return status; }
    
public void setStatus(String status) { this.status = status; }
    
public String getHomologacao() { return homologacao; }
    
public void setHomologacao(String homologacao) { this.homologacao = homologacao; }
    
public String getObservacoes() { return observacoes; }
    
public void setObservacoes(String observacoes) { this.observacoes = observacoes; }
    
public Instant getCriadoEm() { return criadoEm; }
    
public void setCriadoEm(Instant criadoEm) { this.criadoEm = criadoEm; }
    
public Instant getAtualizadoEm() { return atualizadoEm; }
    
public void setAtualizadoEm(Instant atualizadoEm) { this.atualizadoEm = atualizadoEm; }


public static class Volume {
    private Double x;
    private Double y;
    private Double z;
    public Volume() {}
    public Double getX() { return x; }
    public void setX(Double x) { this.x = x; }
    public Double getY() { return y; }
    public void setY(Double y) { this.y = y; }
    public Double getZ() { return z; }
    public void setZ(Double z) { this.z = z; }
    }
}
