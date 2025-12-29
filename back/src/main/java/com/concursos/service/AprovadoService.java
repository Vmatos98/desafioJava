package com.concursos.service;

import com.concursos.model.Aprovado;
import com.concursos.repository.AprovadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class AprovadoService {
    
    @Autowired
    private AprovadoRepository aprovadoRepository;
    
    private final String uploadDir = "uploads/";
    
    public Aprovado salvar(Aprovado aprovado, MultipartFile imagem) throws IOException {
        // Criar diretório se não existir
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        
        // Processar imagem se fornecida
        if (imagem != null && !imagem.isEmpty()) {
            String nomeOriginal = imagem.getOriginalFilename();
            String extensao = nomeOriginal.substring(nomeOriginal.lastIndexOf("."));
            String nomeUnico = UUID.randomUUID().toString() + extensao;
            
            Path caminhoArquivo = uploadPath.resolve(nomeUnico);
            Files.copy(imagem.getInputStream(), caminhoArquivo);
            
            aprovado.setNomeImagem(nomeOriginal);
            aprovado.setCaminhoImagem(uploadDir + nomeUnico);
        }
        
        return aprovadoRepository.save(aprovado);
    }
    
    public List<Aprovado> listarTodos() {
        return aprovadoRepository.findAll();
    }
    
    public Aprovado buscarPorId(Long id) {
        return aprovadoRepository.findById(id).orElse(null);
    }
}