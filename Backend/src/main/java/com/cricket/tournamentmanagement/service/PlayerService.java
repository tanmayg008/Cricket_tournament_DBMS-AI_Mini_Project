package com.cricket.tournamentmanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cricket.tournamentmanagement.model.Player;
import com.cricket.tournamentmanagement.repository.PlayerRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {
    
    @Autowired
    private PlayerRepository playerRepository;
    
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }
    
    public Optional<Player> getPlayerById(Long id) {
        return playerRepository.findById(id);
    }
    
    public Player createPlayer(Player player) {
        return playerRepository.save(player);
    }
    
    public Player updatePlayer(Long id, Player player) {
        player.setId(id);
        return playerRepository.save(player);
    }
    
    public void deletePlayer(Long id) {
        playerRepository.deleteById(id);
    }
}