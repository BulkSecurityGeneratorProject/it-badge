import { BaseEntity } from './../../shared';

export class Badgeage implements BaseEntity {
    constructor(
        public id?: number,
        public badgeageEleve?: any,
        public badgeageCorrige?: any,
        public utilisateur?: BaseEntity,
    ) {
    }
}
