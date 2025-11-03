package com.cricket.tournamentmanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cricket.tournamentmanagement.model.Tournament;
import com.cricket.tournamentmanagement.repository.TournamentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TournamentService {
    
    @Autowired
    private TournamentRepository tournamentRepository;
    
    public List<Tournament> getAllTournaments() {
        return tournamentRepository.findAll();
    }
    
    public Optional<Tournament> getTournamentById(Long id) {
        return tournamentRepository.findById(id);
    }
    
    public Tournament createTournament(Tournament tournament) {
        return tournamentRepository.save(tournament);
    }
    
    public Tournament updateTournament(Long id, Tournament tournament) {
        tournament.setId(id);
        return tournamentRepository.save(tournament);
    }
    
    public void deleteTournament(Long id) {
        tournamentRepository.deleteById(id);
    }
}