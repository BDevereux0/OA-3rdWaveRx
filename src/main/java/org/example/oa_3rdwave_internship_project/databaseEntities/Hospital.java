package org.example.oa_3rdwave_internship_project.databaseEntities;

import lombok.Data;

@Data
public class Hospital extends Works{
    private int Hospital_ID;
    private String Hospital_Name;
    private String Hospital_Address;
    private String Hospital_PhoneNumber;
    private String Hospital_Type_ID;
    private boolean Hospital_TeachCenter;
}
