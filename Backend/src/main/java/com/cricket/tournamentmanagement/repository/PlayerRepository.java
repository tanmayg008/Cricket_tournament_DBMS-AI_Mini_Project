package com.cricket.tournamentmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cricket.tournamentmanagement.model.Player;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
}