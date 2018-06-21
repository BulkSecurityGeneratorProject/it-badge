package com.itescia.itbadge.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Description.
 */
@Entity
@Table(name = "description")
public class Description implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "contenu")
    private String contenu;

    @OneToOne(mappedBy = "description")
    @JsonIgnore
    private Cours cours;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContenu() {
        return contenu;
    }

    public Description contenu(String contenu) {
        this.contenu = contenu;
        return this;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }

    public Cours getCours() {
        return cours;
    }

    public Description cours(Cours cours) {
        this.cours = cours;
        return this;
    }

    public void setCours(Cours cours) {
        this.cours = cours;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Description description = (Description) o;
        if (description.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), description.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Description{" +
            "id=" + getId() +
            ", contenu='" + getContenu() + "'" +
            "}";
    }
}
