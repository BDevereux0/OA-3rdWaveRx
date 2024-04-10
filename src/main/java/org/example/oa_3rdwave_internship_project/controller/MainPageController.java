package org.example.oa_3rdwave_internship_project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/home")
public class MainPageController {

    @GetMapping
    public String firstTry(){
        return "home.html";
    }
}
