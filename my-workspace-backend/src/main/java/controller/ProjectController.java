package com.example.Project.Management.controller;

import com.example.Project.Management.model.Project;
import com.example.Project.Management.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectController {

    private final ProjectService service;

    public ProjectController(ProjectService service) {
        this.service = service;
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Project> create(@PathVariable Long userId,
                                          @RequestBody Project project) {
        return new ResponseEntity<>(service.createProject(userId, project),
                HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}")
    public List<Project> getAll(@PathVariable Long userId) {
        return service.getProjectsForUser(userId);
    }

    @PutMapping("/{id}")
    public Project update(@PathVariable Long id,
                          @RequestBody Project project) {
        return service.updateProject(id, project);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteProject(id);
    }
}
