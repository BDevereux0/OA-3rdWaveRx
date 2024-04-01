package org.example.oa_3rdwave_internship_project;

import org.example.oa_3rdwave_internship_project.entities.Hosptial_Type;
import org.example.oa_3rdwave_internship_project.entities.Medical_Caregiver;
import org.example.oa_3rdwave_internship_project.entities.Patient;
import org.example.oa_3rdwave_internship_project.entities.Patient_Event;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Optional;

@SpringBootTest
class Oa3rdWaveInternshipProjectApplicationTests {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    Patient patient;

    @Test
    void contextLoads() {
        int result = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM PATIENT", Integer.class);
        System.out.println("result = " + result);
    }

    @Test
    void getSingleResult() {

       /* patient = jdbcTemplate.queryForObject("SELECT * FROM PATIENT WHERE PATIENTID = 4"
                , (resultSet, rowNum) -> {
            Patient p = new Patient();
            p.setFirstName(resultSet.getString("firstName"));
            System.out.println(p.getFirstName());
            return p;
        });
        */
        Optional<Patient> returnedResult = Optional.of(
         jdbcTemplate.queryForObject(
                "Select * FROM PATIENT WHERE PATIENTID = 4",
                BeanPropertyRowMapper.newInstance(Patient.class)
        ));
        System.out.println(returnedResult);

    }

    @Test
    void getMultipleResults(){
        List<Patient_Event> patients = jdbcTemplate.query(
                "SELECT * FROM PATIENT_EVENT",
                BeanPropertyRowMapper.newInstance(Patient_Event.class)
        );
        Optional<List<Patient_Event>> returnedResult = Optional.ofNullable(patients);
        System.out.println(returnedResult);

    }


}
