package com.itescia.itbadge.repository;

import com.itescia.itbadge.domain.Groupe;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Groupe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GroupeRepository extends JpaRepository<Groupe, Long> {
    @Query("select distinct groupe from Groupe groupe left join fetch groupe.listCours")
    List<Groupe> findAllWithEagerRelationships();

    @Query("select groupe from Groupe groupe left join fetch groupe.listCours where groupe.id =:id")
    Groupe findOneWithEagerRelationships(@Param("id") Long id);

}
