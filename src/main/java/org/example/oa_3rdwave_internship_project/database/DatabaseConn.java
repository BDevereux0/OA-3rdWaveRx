package org.example.oa_3rdwave_internship_project.database;

import org.example.oa_3rdwave_internship_project.databaseEntities.*;

import java.util.List;

public interface DatabaseConn {

    public List<Hospital> getAllHospitals();

    public List<Patient> getAllPatients();

    public List<Medical_Transaction> getAllMedicalTransactions();
}
