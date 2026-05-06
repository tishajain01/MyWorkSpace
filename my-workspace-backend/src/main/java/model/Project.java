package com.example.Project.Management.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String projectName;
    private String managerName;
    private LocalDate startDate;
    private LocalDate endDate;
    private String priority;
    private String description;
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
