package com.itescia.itbadge.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Badgeage.
 */
@Entity
@Table(name = "badgeage")
public class Badgeage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "badgeage_eleve", nullable = false)
    private LocalDate badgeageEleve;

    @NotNull
    @Column(name = "badgeage_corrige", nullable = false)
    private LocalDate badgeageCorrige;

    @ManyToOne(optional = false)
    @NotNull
    private Utilisateur utilisateur;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getBadgeageEleve() {
        return badgeageEleve;
    }

    public Badgeage badgeageEleve(LocalDate badgeageEleve) {
        this.badgeageEleve = badgeageEleve;
        return this;
    }

    public void setBadgeageEleve(LocalDate badgeageEleve) {
        this.badgeageEleve = badgeageEleve;
    }

    public LocalDate getBadgeageCorrige() {
        return badgeageCorrige;
    }

    public Badgeage badgeageCorrige(LocalDate badgeageCorrige) {
        this.badgeageCorrige = badgeageCorrige;
        return this;
    }

    public void setBadgeageCorrige(LocalDate badgeageCorrige) {
        this.badgeageCorrige = badgeageCorrige;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public Badgeage utilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
        return this;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
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
        Badgeage badgeage = (Badgeage) o;
        if (badgeage.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), badgeage.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Badgeage{" +
            "id=" + getId() +
            ", badgeageEleve='" + getBadgeageEleve() + "'" +
            ", badgeageCorrige='" + getBadgeageCorrige() + "'" +
            "}";
    }
}
