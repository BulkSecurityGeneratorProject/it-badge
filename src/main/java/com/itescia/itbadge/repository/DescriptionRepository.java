package com.itescia.itbadge.repository;

import com.itescia.itbadge.domain.Description;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Description entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DescriptionRepository extends JpaRepository<Description, Long> {

}
