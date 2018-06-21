package com.itescia.itbadge.service;

import com.itescia.itbadge.domain.Description;
import java.util.List;

/**
 * Service Interface for managing Description.
 */
public interface DescriptionService {

    /**
     * Save a description.
     *
     * @param description the entity to save
     * @return the persisted entity
     */
    Description save(Description description);

    /**
     * Get all the descriptions.
     *
     * @return the list of entities
     */
    List<Description> findAll();
    /**
     * Get all the DescriptionDTO where Cours is null.
     *
     * @return the list of entities
     */
    List<Description> findAllWhereCoursIsNull();

    /**
     * Get the "id" description.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Description findOne(Long id);

    /**
     * Delete the "id" description.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
