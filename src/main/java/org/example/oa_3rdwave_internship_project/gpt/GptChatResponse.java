package org.example.oa_3rdwave_internship_project.gpt;

import lombok.Data;

@Data
public class GptChatResponse {
    private String id;
    private String object;
    private long created;
    private String model;
    private String system_fingerprint;
    private Choice[] choices;
    private Usage usage;

    @Data
    public static class Choice {
        private int index;
        private Message message;
        private Object logprobs;
        private String finish_reason;
    }

    @Data
    public static class Message {
        private String role;
        private String content;
    }

    @Data
    public static class Usage {
        private int prompt_tokens;
        private int completion_tokens;
        private int total_tokens;
    }
}

