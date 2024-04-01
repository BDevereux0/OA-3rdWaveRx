package org.example.oa_3rdwave_internship_project.entities;

import lombok.Data;

import java.sql.Date;
@Data
public class Patient_Event extends Works{
    private int EventID;
    private Date Event_Date;
    private int PatientID;
    private String Event_Description;
}
