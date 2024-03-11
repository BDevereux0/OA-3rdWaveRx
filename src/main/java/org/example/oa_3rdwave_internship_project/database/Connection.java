package org.example.oa_3rdwave_internship_project.database;

import org.springframework.jdbc.core.JdbcTemplate;

public class Connection {
    private final JdbcTemplate jdbcTemplate;
    

    public Connection(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public static void main(String[] args) {

    }
}
