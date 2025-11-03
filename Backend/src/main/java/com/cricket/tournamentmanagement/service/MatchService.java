package com.cricket.tournamentmanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cricket.tournamentmanagement.model.Match;
import com.cricket.tournamentmanagement.repository.MatchRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MatchService {
    
    @Autowired
    private MatchRepository matchRepository;
    
    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }
    
    public Optional<Match> getMatchById(Long id) {
        return matchRepository.findById(id);
    }
    
    public Match createMatch(Match match) {
        return matchRepository.save(match);
    }
    
    public Match updateMatch(Long id, Match match) {
        match.setId(id);
        return matchRepository.save(match);
    }
    
    public void deleteMatch(Long id) {
        matchRepository.deleteById(id);
    }
}