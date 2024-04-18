package org.example.oa_3rdwave_internship_project.databaseEntities;

import lombok.Data;

@Data
public class Medical_Caregiver {
    private int CaregiverID;
    private String FirstName;
    private String LastName;
    private String PhoneNumber;
    private int CaregiverTypeID;
}
