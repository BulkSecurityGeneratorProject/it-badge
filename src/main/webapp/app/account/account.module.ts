import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ItbadgeSharedModule } from '../shared';

import {
    Register,
    LoginService,
    RegisterComponent,
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
        RegisterComponent,
        SettingsComponent
    ],
    providers: [
        Register,
        LoginService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ItbadgeAccountModule {}
