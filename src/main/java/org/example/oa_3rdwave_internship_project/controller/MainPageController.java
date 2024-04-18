package org.example.oa_3rdwave_internship_project.controller;

import org.example.oa_3rdwave_internship_project.models.FrontEndFormRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/home")
public class MainPageController {

    @GetMapping
    public String firstTry(){
        return "home2.html";
    }

    @PostMapping("/submitFormData")
    public ResponseEntity<String> handleFormSubmission(@RequestBody String formData) {
        // Process the form data and perform necessary actions
        // YourDataClass represents the structure of the data sent from the client
        // You can define this class with properties matching the data fields you expect to receive

        // Example: printing the received data
        System.out.println(formData);
        String formattedData = formatInput(formData);
        System.out.println(formattedData);
        // Return a response
        return ResponseEntity.ok("Form data received successfully!");
    }


    private String formatInput(String input){
        // Find the index of the first occurrence of ":"
        int colonIndex = input.indexOf(":");
        // Find the index of the opening quotation mark after the colon
        int openingQuoteIndex = input.indexOf("\"", colonIndex + 1);
        // Find the index of the closing quotation mark after the opening quotation mark
        int closingQuoteIndex = input.indexOf("\"", openingQuoteIndex + 1);
        // Extract the substring between the quotation marks
        String textBox1Value = input.substring(openingQuoteIndex + 1, closingQuoteIndex);

        return textBox1Value;
    }
}
