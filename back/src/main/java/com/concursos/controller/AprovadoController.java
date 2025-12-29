package com.concursos.controller;

import com.concursos.model.Aprovado;
import com.concursos.service.AprovadoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/aprovados")
@CrossOrigin(origins = "*")
public class AprovadoController {
    
    @Autowired
    private AprovadoService aprovadoService;
    
    @PostMapping
    public ResponseEntity<?> cadastrar(
            @RequestParam("nome") String nome,
            @RequestParam("email") String email,
            @RequestParam("telefone") String telefone,
            @RequestParam("concursosAprovados") String concursosAprovados,
            @RequestParam(value = "imagem", required = false) MultipartFile imagem) {
        
        try {
            Aprovado aprovado = new Aprovado(nome, email, telefone, concursosAprovados);
            Aprovado aprovadoSalvo = aprovadoService.salvar(aprovado, imagem);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Cadastro realizado com sucesso!");
            response.put("data", aprovadoSalvo);
            
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erro ao processar imagem: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erro interno do servidor: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @GetMapping
    public ResponseEntity<List<Aprovado>> listarTodos() {
        List<Aprovado> aprovados = aprovadoService.listarTodos();
        return ResponseEntity.ok(aprovados);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Aprovado> buscarPorId(@PathVariable Long id) {
        Aprovado aprovado = aprovadoService.buscarPorId(id);
        if (aprovado != null) {
            return ResponseEntity.ok(aprovado);
        }
        return ResponseEntity.notFound().build();
    }
}