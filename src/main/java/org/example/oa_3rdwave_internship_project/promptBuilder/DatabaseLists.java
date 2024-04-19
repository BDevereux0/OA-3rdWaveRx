package org.example.oa_3rdwave_internship_project.promptBuilder;

import lombok.Data;
import org.example.oa_3rdwave_internship_project.databaseEntities.Hospital;
import org.example.oa_3rdwave_internship_project.databaseEntities.Patient;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Data
@Component
public class DatabaseLists {
    List<Hospital> hospitals = new ArrayList<>();
    List<Patient> patients = new ArrayList<>();
}
