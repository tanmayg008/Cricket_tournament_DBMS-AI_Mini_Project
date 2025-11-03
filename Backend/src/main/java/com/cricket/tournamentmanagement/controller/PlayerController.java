package com.cricket.tournamentmanagement.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cricket.tournamentmanagement.dto.ApiResponse;
import com.cricket.tournamentmanagement.model.Player;
import com.cricket.tournamentmanagement.service.PlayerService;

import java.util.List;

@RestController
@RequestMapping("/api/player")
@CrossOrigin(origins = "*")
public class PlayerController {
    
    @Autowired
    private PlayerService playerService;
    
    @GetMapping("/list")
    public ResponseEntity<List<Player>> getAllPlayers() {
        return ResponseEntity.ok(playerService.getAllPlayers());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Player> getPlayerById(@PathVariable Long id) {
        return playerService.getPlayerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/add")
    public ResponseEntity<ApiResponse> createPlayer(@Valid @RequestBody Player player) {
        try {
            Player created = playerService.createPlayer(player);
            ApiResponse response = new ApiResponse(true, "Player added successfully", created.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to add player: " + e.getMessage()));
        }
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse> updatePlayer(@PathVariable Long id, @Valid @RequestBody Player player) {
        try {
            playerService.updatePlayer(id, player);
            return ResponseEntity.ok(new ApiResponse(true, "Player updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to update player: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> deletePlayer(@PathVariable Long id) {
        try {
            playerService.deletePlayer(id);
            return ResponseEntity.ok(new ApiResponse(true, "Player deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to delete player: " + e.getMessage()));
        }
    }
}