package org.example.oa_3rdwave_internship_project.controller;

import org.example.oa_3rdwave_internship_project.gpt.GptChatRequest;
import org.example.oa_3rdwave_internship_project.gpt.GptChatResponse;
import org.example.oa_3rdwave_internship_project.gpt.OpenAIService;
import org.example.oa_3rdwave_internship_project.models.FrontEndFormRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/home")
public class MainPageController {
    private final OpenAIService openAIService;

    public MainPageController(OpenAIService openAIService){
        this.openAIService = openAIService;
    }


    @GetMapping
    public String firstTry(){
        return "home.html";
    }

    @PostMapping("/submitFormData")
    public ResponseEntity<String> handleFormSubmission(@RequestBody String formData) {
        // Log the received form data
        System.out.println("Received form data: " + formData);

        // Format the input data if needed
        String formattedData = formatInput(formData);
        System.out.println("Formatted data: " + formattedData);

        // Perform any necessary processing

        // Call OpenAI service method to interact with the API
        List<GptChatRequest.Message> messages = new ArrayList<>();
        // Assuming you want to send the form data as a message to OpenAI
        messages.add(new GptChatRequest.Message("user", formData));
        GptChatResponse response = openAIService.chatWithGPT(messages);

        // Log the response received from OpenAI
        System.out.println("Response from OpenAI: " + response);

        // Optionally process the response

        // Return a success response
        return ResponseEntity.ok("Form data received and processed successfully!");
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

    @PostMapping("/chatWithGPT")
    public ResponseEntity<GptChatResponse> chatWithGPT(
            @RequestBody List<GptChatRequest.Message> messages) {
        GptChatResponse response = openAIService.chatWithGPT(messages);
        return ResponseEntity.ok(response);
    }



}
