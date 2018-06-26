import { BaseEntity } from './../../shared';

export class Description implements BaseEntity {
    constructor(
        public id?: number,
        public contenu?: string,
        public listCours?: BaseEntity[],
    ) {
    }
}
