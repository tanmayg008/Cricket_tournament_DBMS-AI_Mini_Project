package com.cricket.tournamentmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cricket.tournamentmanagement.model.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
}