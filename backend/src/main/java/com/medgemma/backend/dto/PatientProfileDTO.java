package com.medgemma.backend.dto;

import lombok.Data;

@Data
public class PatientProfileDTO {
    private String name;
    private String age;
    private String sex;
    private String cid;
    private String complaint;
    private String history;
}