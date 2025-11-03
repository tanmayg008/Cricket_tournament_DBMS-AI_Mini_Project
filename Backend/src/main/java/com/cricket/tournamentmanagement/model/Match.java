package com.cricket.tournamentmanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "matches")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Match {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "tournament_id")
    private Long tournamentId;
    
    @Column(name = "team1_id")
    private Long team1Id;
    
    @Column(name = "team2_id")
    private Long team2Id;
    
    @NotNull(message = "Match date is required")
    @Column(nullable = false)
    private LocalDate date;
    
    @NotBlank(message = "Venue is required")
    @Column(nullable = false)
    private String venue;
    
    @Column(name = "winner_id")
    private Long winnerId;
    
    @Column(length = 50)
    private String status = "Scheduled";
}