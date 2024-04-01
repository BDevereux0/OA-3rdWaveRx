package org.example.oa_3rdwave_internship_project.api;

import org.example.oa_3rdwave_internship_project.database.DatabaseConn;
import org.example.oa_3rdwave_internship_project.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void getHospital(){
        List<Hospital> list = dbc.getAllHospitals();
        for (Hospital h : list){
            System.out.println(h);
        }
    }

    @GetMapping("/transactions")
    public void getMedicalTransactions(){
        List<Medical_Transaction> list = dbc.getAllMedicalTransactions();
        for (Medical_Transaction h : list){
            System.out.println(h);
        }
    }

    @GetMapping("/patients")
    public void getPatients(){
        List<Patient> list = dbc.getAllPatients();
        for (Patient h : list){
            System.out.println(h);
        }
    }

}
