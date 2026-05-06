package com.example.Project.Management.service.impl;

import com.example.Project.Management.model.Project;
import com.example.Project.Management.model.User;
import com.example.Project.Management.repository.ProjectRepository;
import com.example.Project.Management.repository.UserRepository;
import com.example.Project.Management.service.ProjectService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepo;
    private final UserRepository userRepo;

    public ProjectServiceImpl(ProjectRepository projectRepo, UserRepository userRepo) {
        this.projectRepo = projectRepo;
        this.userRepo = userRepo;
    }

    @Override
    public Project createProject(Long userId, Project project) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        project.setUser(user);
        return projectRepo.save(project);
    }

    @Override
    public List<Project> getProjectsForUser(Long userId) {
        // Individual Workspace: strictly return only user-specific data
        return projectRepo.findByUserId(userId);
    }

    @Override
    public Project updateProject(Long id, Project project) {
        Project existing = projectRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // MANDATORY: Manually map every field to ensure "All means All" update
        existing.setProjectName(project.getProjectName());
        existing.setManagerName(project.getManagerName());
        existing.setStartDate(project.getStartDate());
        existing.setEndDate(project.getEndDate());
        existing.setPriority(project.getPriority());
        existing.setDescription(project.getDescription());
        existing.setStatus(project.getStatus());

        // Saves the fully updated object back to MySQL
        return projectRepo.save(existing);
    }

    @Override
    public void deleteProject(Long id) {
        projectRepo.deleteById(id);
    }
}