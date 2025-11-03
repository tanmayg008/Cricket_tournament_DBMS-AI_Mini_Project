package com.cricket.tournamentmanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "teams")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Team {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Team name is required")
    @Column(nullable = false)
    private String name;
    
    @Column(name = "tournament_id")
    private Long tournamentId;
    
    @NotBlank(message = "Captain name is required")
    @Column(nullable = false)
    private String captain;
    
    private String coach;
    
    @Column(columnDefinition = "INT DEFAULT 0")
    private Integer players = 0;
}