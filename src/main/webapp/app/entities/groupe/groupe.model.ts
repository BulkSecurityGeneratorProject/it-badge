import { BaseEntity } from './../../shared';

export class Groupe implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public listEleves?: BaseEntity[],
        public listCours?: BaseEntity[],
    ) {
    }
}
