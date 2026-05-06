package com.example.Project.Management.service;

import com.example.Project.Management.model.Project;

import java.util.List;

public interface ProjectService {
    Project createProject(Long userId, Project project);
    List<Project> getProjectsForUser(Long userId);
    Project updateProject(Long id, Project project);
    void deleteProject(Long id);
}
