package com.cricket.tournamentmanagement.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cricket.tournamentmanagement.dto.ApiResponse;
import com.cricket.tournamentmanagement.model.Tournament;
import com.cricket.tournamentmanagement.service.TournamentService;

import java.util.List;

@RestController
@RequestMapping("/api/tournament")
@CrossOrigin(origins = "*")
public class TournamentController {
    
    @Autowired
    private TournamentService tournamentService;
    
    @GetMapping("/list")
    public ResponseEntity<List<Tournament>> getAllTournaments() {
        return ResponseEntity.ok(tournamentService.getAllTournaments());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Tournament> getTournamentById(@PathVariable Long id) {
        return tournamentService.getTournamentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/add")
    public ResponseEntity<ApiResponse> createTournament(@Valid @RequestBody Tournament tournament) {
        try {
            Tournament created = tournamentService.createTournament(tournament);
            ApiResponse response = new ApiResponse(true, "Tournament added successfully", created.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to add tournament: " + e.getMessage()));
        }
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse> updateTournament(@PathVariable Long id, @Valid @RequestBody Tournament tournament) {
        try {
            tournamentService.updateTournament(id, tournament);
            return ResponseEntity.ok(new ApiResponse(true, "Tournament updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to update tournament: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> deleteTournament(@PathVariable Long id) {
        try {
            tournamentService.deleteTournament(id);
            return ResponseEntity.ok(new ApiResponse(true, "Tournament deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to delete tournament: " + e.getMessage()));
        }
    }
}