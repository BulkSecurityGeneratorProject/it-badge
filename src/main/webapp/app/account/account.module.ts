import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ItbadgeSharedModule } from '../shared';

import {
    LoginService,
    LoginComponent,
    SettingsComponent,
    accountState
} from './';

@NgModule({
    imports: [
        ItbadgeSharedModule,
        RouterModule.forChild(accountState)
    ],
    declarations: [
        LoginComponent,
        SettingsComponent
    ],
    providers: [
        LoginService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ItbadgeAccountModule {}
