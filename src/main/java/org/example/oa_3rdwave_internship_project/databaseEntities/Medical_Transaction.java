package org.example.oa_3rdwave_internship_project.databaseEntities;

import lombok.Data;

import java.sql.Date;
@Data
public class Medical_Transaction {
    private int Medical_TransactionID;
    private Date Date_Filled;
    private String NDC;
    private int RxNumber;
    private int Patient_ID;
}
