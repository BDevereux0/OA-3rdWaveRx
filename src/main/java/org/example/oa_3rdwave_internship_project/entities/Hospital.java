package org.example.oa_3rdwave_internship_project.entities;

import lombok.Data;

@Data
public class Hospital extends Works{
    private int Hospital_ID;
    private String Hospital_Name;
    private String Hosptial_Address;
    private String Hospital_PhoneNumber;
    private String Hosptial_Type_ID;
    private boolean Hospital_TeachCenter;
}
