package com.itescia.itbadge.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Cours.
 */
@Entity
@Table(name = "cours")
public class Cours implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3, max = 30)
    @Column(name = "nom", length = 30, nullable = false)
    private String nom;

    @NotNull
    @Column(name = "date_debut", nullable = false)
    private LocalDate dateDebut;

    @NotNull
    @Column(name = "date_fin", nullable = false)
    private LocalDate dateFin;

    @ManyToMany(mappedBy = "cours")
    @JsonIgnore
    private Set<Groupe> listGroupes = new HashSet<>();

    @ManyToMany(mappedBy = "listCours")
    @JsonIgnore
    private Set<Utilisateur> listProfesseurs = new HashSet<>();

    @ManyToOne
    private Description description;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Cours nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public Cours dateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
        return this;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public Cours dateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
        return this;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public Set<Groupe> getListGroupes() {
        return listGroupes;
    }

    public Cours listGroupes(Set<Groupe> groupes) {
        this.listGroupes = groupes;
        return this;
    }

    public Cours addListGroupe(Groupe groupe) {
        this.listGroupes.add(groupe);
        groupe.getCours().add(this);
        return this;
    }

    public Cours removeListGroupe(Groupe groupe) {
        this.listGroupes.remove(groupe);
        groupe.getCours().remove(this);
        return this;
    }

    public void setListGroupes(Set<Groupe> groupes) {
        this.listGroupes = groupes;
    }

    public Set<Utilisateur> getListProfesseurs() {
        return listProfesseurs;
    }

    public Cours listProfesseurs(Set<Utilisateur> utilisateurs) {
        this.listProfesseurs = utilisateurs;
        return this;
    }

    public Cours addListProfesseur(Utilisateur utilisateur) {
        this.listProfesseurs.add(utilisateur);
        utilisateur.getListCours().add(this);
        return this;
    }

    public Cours removeListProfesseur(Utilisateur utilisateur) {
        this.listProfesseurs.remove(utilisateur);
        utilisateur.getListCours().remove(this);
        return this;
    }

    public void setListProfesseurs(Set<Utilisateur> utilisateurs) {
        this.listProfesseurs = utilisateurs;
    }

    public Description getDescription() {
        return description;
    }

    public Cours description(Description description) {
        this.description = description;
        return this;
    }

    public void setDescription(Description description) {
        this.description = description;
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
        Cours cours = (Cours) o;
        if (cours.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cours.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cours{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", dateDebut='" + getDateDebut() + "'" +
            ", dateFin='" + getDateFin() + "'" +
            "}";
    }
}
