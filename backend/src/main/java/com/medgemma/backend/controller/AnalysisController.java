package com.medgemma.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.medgemma.backend.dto.PatientProfileDTO;
import com.medgemma.backend.service.AnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/analysis")
@CrossOrigin(origins = "http://localhost:3000") // Muito importante: Libera o Next.js para fazer requisições
public class AnalysisController {

    @Autowired
    private AnalysisService analysisService;

    @PostMapping
    public ResponseEntity<?> analyzeCase(
            @RequestParam("patient_data") String patientDataJson,
            @RequestParam(value = "message", required = false) String message,
            @RequestParam(value = "files", required = false) List<MultipartFile> files) {

        try {
                // Converte o JSON em texto para o nosso objeto Java
                    ObjectMapper mapper = new ObjectMapper();
                    PatientProfileDTO patient = mapper.readValue(patientDataJson, PatientProfileDTO.class);

                    // Chama o serviço para processar, salvar no banco e gerar a resposta
                    String aiResponse = analysisService.processClinicalCase(patient, message, files);

                    // Cria o corpo da resposta de sucesso
                    Map<String, String> successBody = new java.util.HashMap<>();
                    successBody.put("status", "success");
                    successBody.put("response", aiResponse);

                    return ResponseEntity.ok(successBody);

            } 
        
        catch (Exception e) {
                    e.printStackTrace(); 
                    
                    // Cria o corpo da resposta de erro
                    Map<String, String> errorBody = new java.util.HashMap<>();
                    errorBody.put("status", "error");
                    errorBody.put("message", "Erro interno no servidor: " + e.getMessage());

                    return ResponseEntity.internalServerError().body(errorBody);
            }
    }
}