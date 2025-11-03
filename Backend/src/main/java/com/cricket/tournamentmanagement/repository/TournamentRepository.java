package com.cricket.tournamentmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cricket.tournamentmanagement.model.Tournament;

@Repository
public interface TournamentRepository extends JpaRepository<Tournament, Long> {
}