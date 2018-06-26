import { BaseEntity } from './../../shared';

export class Badgeage implements BaseEntity {
    constructor(
        public id?: number,
        public currentDate?: any,
        public badgeageEleve?: any,
        public badgeageCorrige?: any,
        public utilisateur?: BaseEntity,
    ) {
    }
}
