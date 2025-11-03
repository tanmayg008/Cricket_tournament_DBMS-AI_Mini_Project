package com.cricket.tournamentmanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "players")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Player {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Player name is required")
    @Column(nullable = false)
    private String name;
    
    @Column(name = "team_id")
    private Long teamId;
    
    @NotBlank(message = "Role is required")
    @Column(nullable = false)
    private String role;
    
    private Integer age;
    
    @Column(columnDefinition = "INT DEFAULT 0")
    private Integer matches = 0;
}