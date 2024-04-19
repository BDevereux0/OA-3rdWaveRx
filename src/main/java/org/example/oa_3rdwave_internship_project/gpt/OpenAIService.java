package org.example.oa_3rdwave_internship_project.gpt;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class OpenAIService {
    private final WebClient webClient;
    private final String apiKey = System.getenv("openai.api.key");

    public OpenAIService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.openai.com/v1/chat/completions")
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .build();
    }

    public GptChatResponse chatWithGPT(List<GptChatRequest.Message> messages) {
        GptChatRequest request = new GptChatRequest("gpt-3.5-turbo", messages);
        return webClient.post()
                .body(BodyInserters.fromValue(request))
                .retrieve()
                .bodyToMono(GptChatResponse.class)
                .block();
    }
}
