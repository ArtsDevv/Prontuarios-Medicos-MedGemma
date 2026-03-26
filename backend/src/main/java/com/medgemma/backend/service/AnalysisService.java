package com.medgemma.backend.service;

import com.medgemma.backend.dto.PatientProfileDTO;
import com.medgemma.backend.model.PatientCase;
import com.medgemma.backend.repository.PatientCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class AnalysisService {

    @Autowired
    private PatientCaseRepository repository;

    public String processClinicalCase(PatientProfileDTO dto, String chatMessage, List<MultipartFile> files) {
        
        PatientCase patientCase = new PatientCase();
        patientCase.setPatientName(dto.getName());
        patientCase.setAge(dto.getAge());
        patientCase.setSex(dto.getSex());
        patientCase.setCid(dto.getCid());
        patientCase.setComplaint(dto.getComplaint());
        patientCase.setHistory(dto.getHistory() + "\n\nMensagem do Médico: " + chatMessage);

        int fileCount = (files != null) ? files.size() : 0;
        
        String aiSimulatedResponse = "Análise concluída pelo MedGemma Backend. Paciente: " 
                + dto.getName() + " registrado com sucesso. " 
                + fileCount + " imagem(ns) recebida(s). Aguardando conexão real com o modelo Python.";

        patientCase.setAiAnalysisResult(aiSimulatedResponse);
        repository.save(patientCase);

        return aiSimulatedResponse;
    }
}