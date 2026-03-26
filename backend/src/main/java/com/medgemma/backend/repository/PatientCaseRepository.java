package com.medgemma.backend.repository;

import com.medgemma.backend.model.PatientCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientCaseRepository extends JpaRepository<PatientCase, Long> {}