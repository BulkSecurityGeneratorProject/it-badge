import { BaseEntity } from './../../shared';

export class Utilisateur implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public isAdmin?: boolean,
        public isProfesseur?: boolean,
        public listBadgeages?: BaseEntity[],
        public groupe?: BaseEntity,
        public listCours?: BaseEntity[],
    ) {
        this.isAdmin = false;
        this.isProfesseur = false;
    }
}
