package org.example.oa_3rdwave_internship_project.database;

import org.example.oa_3rdwave_internship_project.entities.*;

import java.util.List;
import java.util.Optional;

public interface DatabaseConn {

    public List<Hospital> getAllHospitals();

    public List<Patient> getAllPatients();

    public List<Medical_Transaction> getAllMedicalTransactions();
}
