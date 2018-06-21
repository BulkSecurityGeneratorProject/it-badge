package com.itescia.itbadge.repository;

import com.itescia.itbadge.domain.Badgeage;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Badgeage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BadgeageRepository extends JpaRepository<Badgeage, Long> {

}
