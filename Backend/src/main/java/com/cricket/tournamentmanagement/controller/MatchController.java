package com.cricket.tournamentmanagement.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cricket.tournamentmanagement.dto.ApiResponse;
import com.cricket.tournamentmanagement.model.Match;
import com.cricket.tournamentmanagement.service.MatchService;

import java.util.List;

@RestController
@RequestMapping("/api/match")
@CrossOrigin(origins = "*")
public class MatchController {
    
    @Autowired
    private MatchService matchService;
    
    @GetMapping("/list")
    public ResponseEntity<List<Match>> getAllMatches() {
        return ResponseEntity.ok(matchService.getAllMatches());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatchById(@PathVariable Long id) {
        return matchService.getMatchById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/add")
    public ResponseEntity<ApiResponse> createMatch(@Valid @RequestBody Match match) {
        try {
            Match created = matchService.createMatch(match);
            ApiResponse response = new ApiResponse(true, "Match added successfully", created.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to add match: " + e.getMessage()));
        }
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse> updateMatch(@PathVariable Long id, @Valid @RequestBody Match match) {
        try {
            matchService.updateMatch(id, match);
            return ResponseEntity.ok(new ApiResponse(true, "Match updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to update match: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> deleteMatch(@PathVariable Long id) {
        try {
            matchService.deleteMatch(id);
            return ResponseEntity.ok(new ApiResponse(true, "Match deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to delete match: " + e.getMessage()));
        }
    }
}