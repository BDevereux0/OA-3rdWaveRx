package org.example.oa_3rdwave_internship_project.controller;

import org.example.oa_3rdwave_internship_project.databaseEntities.Hospital;
import org.example.oa_3rdwave_internship_project.databaseEntities.Patient;
import org.example.oa_3rdwave_internship_project.gpt.GptChatRequest;
import org.example.oa_3rdwave_internship_project.gpt.GptChatResponse;
import org.example.oa_3rdwave_internship_project.gpt.OpenAIService;
import org.example.oa_3rdwave_internship_project.models.FrontEndFormRequest;
import org.example.oa_3rdwave_internship_project.promptBuilder.DatabaseLists;
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
    private DatabaseLists lists;

    public MainPageController(OpenAIService openAIService, DatabaseLists lists){
        this.openAIService = openAIService;
        this.lists = lists;
    }


    @GetMapping
    public String firstTry(){
        return "home.html";
    }

    //todo need to fix the method & variable names - hole camole
    @PostMapping("/submitFormData")
    public ResponseEntity<String> handleFormSubmission(@RequestBody String formData) {
        String formattedPrompt;
        // Log the received form data
        System.out.println("Received form data: " + formData);

        //strips text so exactly what user submits is sent.
        //Probably should validate this somehow.
        String formattedData = formatInput(formData);
        boolean hasWord = hasPatientOrHospital(formattedData);

        formattedPrompt = formatPrompt(formattedData, hasWord);

        // Call OpenAI service method to interact with the API
        List<GptChatRequest.Message> messages = new ArrayList<>();
        // Assuming you want to send the form data as a message to OpenAI
        messages.add(new GptChatRequest.Message("user", formattedPrompt));
        GptChatResponse response = openAIService.chatWithGPT(messages);
        String message = extractMessage(response);




        // Return a success response
        return ResponseEntity.ok(message);
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

    private String extractMessage(GptChatResponse response) {
        if (response == null || response.getChoices() == null || response.getChoices().length == 0) {
            return null; // Handle null or empty response
        }

        // Assuming there's only one choice
        GptChatResponse.Choice choice = response.getChoices()[0];
        if (choice == null || choice.getMessage() == null) {
            return null; // Handle null choice or message
        }

        return choice.getMessage().getContent(); // Extract and return message content
    }

    private String formatPrompt(String userInputMsg, boolean hasWord){
        // Initialize the StringBuilder with the initial prompt message
        StringBuilder prompt = new StringBuilder("""
        This request may or may not come with a table of data relating to Patients or Hospitals. If there is no table of
        data, you should simply respond to the question. The table data will be at the end of the request. 
        The users question is:
        """);

        prompt.append(userInputMsg);
        // Append additional instructions or clarifications
        prompt.append("\n\nAdditional Instructions:")
                .append("\n- If a table of data is included, please ensure to analyze it thoroughly.")
                .append("\n- If no table data is sent, provide a response based on the question asked.")
                .append("\n- If there are any errors or inconsistencies, notify the user accordingly.");

        if (hasWord){
        List<Hospital> hospitals = lists.getHospitals();
        List<Patient> patients = lists.getPatients();
        if (!hospitals.isEmpty() || !patients.isEmpty()) {
            // Append a section about hospitals if available
            if (!hospitals.isEmpty()) {
                prompt.append("\n\nHospitals:\n");
                for (Hospital hospital : hospitals) {
                    prompt.append(hospital.toString()).append("\n");
                }
            }

            // Append a section about patients if available
            if (!patients.isEmpty()) {
                prompt.append("\n\nPatients:\n");
                for (Patient patient : patients) {
                    prompt.append(patient.toString()).append("\n");
                }
            }
        }
        }

        // Return the formatted prompt message
        return prompt.toString();
    }

    private boolean hasPatientOrHospital(String checkedValue){
        boolean result = false;
        String value = checkedValue.toLowerCase();
        if (value.contains("patient") || value.contains("hospital")){
            result = true;
        }

        return result;
    }

}
