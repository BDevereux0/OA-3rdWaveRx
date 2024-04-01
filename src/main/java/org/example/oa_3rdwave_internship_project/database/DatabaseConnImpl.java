package org.example.oa_3rdwave_internship_project.database;

import org.example.oa_3rdwave_internship_project.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class DatabaseConnImpl implements DatabaseConn {

    private JdbcTemplate jdbcTemplate;

    @Autowired
    public DatabaseConnImpl(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Hospital> getAllHospitals() {
        List<Hospital> hospitals = jdbcTemplate.query("Select * FROM HOSPITAL",
                BeanPropertyRowMapper.newInstance(Hospital.class));

        return hospitals;
    }

    @Override
    public List<Patient> getAllPatients() {
        List<Patient> patients = jdbcTemplate.query("Select * FROM PATIENT",
                BeanPropertyRowMapper.newInstance(Patient.class));

        return patients;
    }

    @Override
    public List<Medical_Transaction> getAllMedicalTransactions() {
        List<Medical_Transaction> transactions = jdbcTemplate.query("Select * FROM MEDICAL_TRANSACTION",
                BeanPropertyRowMapper.newInstance(Medical_Transaction.class));

        return transactions;
    }
}
