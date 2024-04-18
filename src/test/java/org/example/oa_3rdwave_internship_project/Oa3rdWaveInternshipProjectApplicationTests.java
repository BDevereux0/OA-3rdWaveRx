package org.example.oa_3rdwave_internship_project;

import org.example.oa_3rdwave_internship_project.databaseEntities.Patient;
import org.example.oa_3rdwave_internship_project.databaseEntities.Patient_Event;

import org.example.oa_3rdwave_internship_project.gpt.GptChatRequest;
import org.example.oa_3rdwave_internship_project.gpt.GptChatResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.*;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.TestPropertySource;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@TestPropertySource(properties = {"openai.api.key=testApiKey"})
class Oa3rdWaveInternshipProjectApplicationTests {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    Patient patient;

    @Test
    void contextLoads() {
        int result = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM PATIENT", Integer.class);
        System.out.println("result = " + result);
    }

    @Test
    void getSingleResult() {

       /* patient = jdbcTemplate.queryForObject("SELECT * FROM PATIENT WHERE PATIENTID = 4"
                , (resultSet, rowNum) -> {
            Patient p = new Patient();
            p.setFirstName(resultSet.getString("firstName"));
            System.out.println(p.getFirstName());
            return p;
        });
        */
        Optional<Patient> returnedResult = Optional.of(
         jdbcTemplate.queryForObject(
                "Select * FROM PATIENT WHERE PATIENTID = 4",
                BeanPropertyRowMapper.newInstance(Patient.class)
        ));
        System.out.println(returnedResult);

    }

    @Test
    void getMultipleResults(){
        List<Patient_Event> patients = jdbcTemplate.query(
                "SELECT * FROM PATIENT_EVENT",
                BeanPropertyRowMapper.newInstance(Patient_Event.class)
        );
        Optional<List<Patient_Event>> returnedResult = Optional.ofNullable(patients);
        System.out.println(returnedResult);

    }

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Test
    public void testGptChat() throws InterruptedException {
        String apiUrl = "https://api.openai.com/v1/chat/completions";
        String apiKey = System.getenv("openai.api.key");

        //this is the object that creates the connection.
        //notice the headers because thats important on configuring the
        //connection.
        WebClient webClient = webClientBuilder.baseUrl(apiUrl)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .build();

        List<GptChatRequest.Message> messages = new ArrayList<>();
        messages.add(new GptChatRequest.Message("system", "You are a helpful assistant."));
        messages.add(new GptChatRequest.Message("user", "Hello!"));

        GptChatRequest request = new GptChatRequest("gpt-3.5-turbo", messages);

        // idk why this works but wrapping this into a for loop stopped the
        // 429 code (Too many requests) I was getting.
        for (int i = 0; i < 1; i++) {
            try {
                GptChatResponse response = webClient.post()
                        .uri(apiUrl)
                        .body(BodyInserters.fromValue(request))
                        .retrieve()
                        .bodyToMono(GptChatResponse.class)
                        .block();


                System.out.println(response);
            } catch (WebClientResponseException.TooManyRequests ex) {
                System.out.println("Rate limit exceeded.");
                Thread.sleep(5000);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }




}
