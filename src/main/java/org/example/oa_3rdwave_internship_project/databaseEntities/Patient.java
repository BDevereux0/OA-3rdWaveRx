package org.example.oa_3rdwave_internship_project.databaseEntities;

import lombok.Data;

import java.sql.Date;
@Data
public class Patient {
    private int patientID;
    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private String gender;
    private String address;
    private int rxNumber_IDI;
    private String phoneNumber;
    private String email;
    private String emergencyContact;
    private String bloodType;
    private String allergies;
    private String medicalHistory;
    private String primaryCarePhysician;
    private String insuranceProvider;
    private String insurancePolicyNumber;
    private String nextOfKin;
    private String maritalStatus;
    private String occupation;
    private String language;
    private String ethnicity;
    private String religion;
    private Date dateAdmitted;
    private Date dischargeDate;
    private String roomNumber;
    private Integer hospitalId;


}
