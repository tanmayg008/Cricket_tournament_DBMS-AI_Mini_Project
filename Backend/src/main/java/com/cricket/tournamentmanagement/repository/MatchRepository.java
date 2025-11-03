package com.cricket.tournamentmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cricket.tournamentmanagement.model.Match;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
}