import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ItbadgeUtilisateurModule } from './utilisateur/utilisateur.module';
import { ItbadgeBadgeageModule } from './badgeage/badgeage.module';
import { ItbadgeGroupeModule } from './groupe/groupe.module';
import { ItbadgeCoursModule } from './cours/cours.module';
import { ItbadgeDescriptionModule } from './description/description.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ItbadgeUtilisateurModule,
        ItbadgeBadgeageModule,
        ItbadgeGroupeModule,
        ItbadgeCoursModule,
        ItbadgeDescriptionModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ItbadgeEntityModule {}
