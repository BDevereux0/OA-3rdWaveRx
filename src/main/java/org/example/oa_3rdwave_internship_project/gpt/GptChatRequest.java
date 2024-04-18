package org.example.oa_3rdwave_internship_project.gpt;

import lombok.Data;
import java.util.List;

import lombok.Data;
import java.util.List;

@Data
public class GptChatRequest {
    private String model;
    private List<Message> messages;

    // Constructor to initialize GptChatRequest fields
    public GptChatRequest(String model, List<Message> messages) {
        this.model = model;
        this.messages = messages;
    }

    @Data
    public static class Message {
        private String role;
        private String content;

        public Message(String role, String content) {
            this.role = role;
            this.content = content;
        }
    }
}


