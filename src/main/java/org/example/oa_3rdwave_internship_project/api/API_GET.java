package org.example.oa_3rdwave_internship_project.api;

import org.example.oa_3rdwave_internship_project.database.DatabaseConn;
import org.example.oa_3rdwave_internship_project.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class API_GET {

    @Autowired
    private DatabaseConn dbc;

    @GetMapping("/hospitals")
    public ResponseEntity<List<Hospital>> getHospital(){
        List<Hospital> list = dbc.getAllHospitals();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<Medical_Transaction>> getMedicalTransactions(){
        List<Medical_Transaction> list = dbc.getAllMedicalTransactions();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> getPatients(){
        List<Patient> list = dbc.getAllPatients();
        return ResponseEntity.ok().body(list);
    }

}
