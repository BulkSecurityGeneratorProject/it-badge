import { BaseEntity } from './../../shared';

export class Cours implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public dateDebut?: any,
        public dateFin?: any,
        public listGroupes?: BaseEntity[],
        public listProfesseurs?: BaseEntity[],
        public description?: BaseEntity,
    ) {
    }
}
