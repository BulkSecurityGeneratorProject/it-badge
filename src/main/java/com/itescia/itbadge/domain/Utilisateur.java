package com.itescia.itbadge.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Utilisateur.
 */
@Entity
@Table(name = "utilisateur")
public class Utilisateur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3, max = 30)
    @Column(name = "nom", length = 30, nullable = false)
    private String nom;

    @NotNull
    @Size(min = 3, max = 30)
    @Column(name = "prenom", length = 30, nullable = false)
    private String prenom;

    @NotNull
    @Column(name = "is_admin", nullable = false)
    private Boolean isAdmin;

    @NotNull
    @Column(name = "is_professeur", nullable = false)
    private Boolean isProfesseur;

    @OneToMany(mappedBy = "utilisateur")
    @JsonIgnore
    private Set<Badgeage> listBadgeages = new HashSet<>();

    @ManyToOne
    private Groupe groupe;

    @ManyToMany
    @JoinTable(name = "utilisateur_list_cours",
               joinColumns = @JoinColumn(name="utilisateurs_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="list_cours_id", referencedColumnName="id"))
    private Set<Cours> listCours = new HashSet<>();

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

    public Utilisateur nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Utilisateur prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Boolean isIsAdmin() {
        return isAdmin;
    }

    public Utilisateur isAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
        return this;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public Boolean isIsProfesseur() {
        return isProfesseur;
    }

    public Utilisateur isProfesseur(Boolean isProfesseur) {
        this.isProfesseur = isProfesseur;
        return this;
    }

    public void setIsProfesseur(Boolean isProfesseur) {
        this.isProfesseur = isProfesseur;
    }

    public Set<Badgeage> getListBadgeages() {
        return listBadgeages;
    }

    public Utilisateur listBadgeages(Set<Badgeage> badgeages) {
        this.listBadgeages = badgeages;
        return this;
    }

    public Utilisateur addListBadgeage(Badgeage badgeage) {
        this.listBadgeages.add(badgeage);
        badgeage.setUtilisateur(this);
        return this;
    }

    public Utilisateur removeListBadgeage(Badgeage badgeage) {
        this.listBadgeages.remove(badgeage);
        badgeage.setUtilisateur(null);
        return this;
    }

    public void setListBadgeages(Set<Badgeage> badgeages) {
        this.listBadgeages = badgeages;
    }

    public Groupe getGroupe() {
        return groupe;
    }

    public Utilisateur groupe(Groupe groupe) {
        this.groupe = groupe;
        return this;
    }

    public void setGroupe(Groupe groupe) {
        this.groupe = groupe;
    }

    public Set<Cours> getListCours() {
        return listCours;
    }

    public Utilisateur listCours(Set<Cours> cours) {
        this.listCours = cours;
        return this;
    }

    public Utilisateur addListCours(Cours cours) {
        this.listCours.add(cours);
        cours.getListProfesseurs().add(this);
        return this;
    }

    public Utilisateur removeListCours(Cours cours) {
        this.listCours.remove(cours);
        cours.getListProfesseurs().remove(this);
        return this;
    }

    public void setListCours(Set<Cours> cours) {
        this.listCours = cours;
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
        Utilisateur utilisateur = (Utilisateur) o;
        if (utilisateur.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), utilisateur.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Utilisateur{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", isAdmin='" + isIsAdmin() + "'" +
            ", isProfesseur='" + isIsProfesseur() + "'" +
            "}";
    }
}
