package com.cricket.tournamentmanagement.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cricket.tournamentmanagement.dto.ApiResponse;
import com.cricket.tournamentmanagement.model.Team;
import com.cricket.tournamentmanagement.service.TeamService;

import java.util.List;

@RestController
@RequestMapping("/api/team")
@CrossOrigin(origins = "*")
public class TeamController {
    
    @Autowired
    private TeamService teamService;
    
    @GetMapping("/list")
    public ResponseEntity<List<Team>> getAllTeams() {
        return ResponseEntity.ok(teamService.getAllTeams());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeamById(@PathVariable Long id) {
        return teamService.getTeamById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/add")
    public ResponseEntity<ApiResponse> createTeam(@Valid @RequestBody Team team) {
        try {
            Team created = teamService.createTeam(team);
            ApiResponse response = new ApiResponse(true, "Team added successfully", created.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to add team: " + e.getMessage()));
        }
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse> updateTeam(@PathVariable Long id, @Valid @RequestBody Team team) {
        try {
            teamService.updateTeam(id, team);
            return ResponseEntity.ok(new ApiResponse(true, "Team updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to update team: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> deleteTeam(@PathVariable Long id) {
        try {
            teamService.deleteTeam(id);
            return ResponseEntity.ok(new ApiResponse(true, "Team deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to delete team: " + e.getMessage()));
        }
    }
}