import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Cours } from './cours.model';
import { CoursPopupService } from './cours-popup.service';
import { CoursService } from './cours.service';
import { Groupe, GroupeService } from '../groupe';
import { Utilisateur, UtilisateurService } from '../utilisateur';
import { Description, DescriptionService } from '../description';

@Component({
    selector: 'jhi-cours-dialog',
    templateUrl: './cours-dialog.component.html'
})
export class CoursDialogComponent implements OnInit {

    cours: Cours;
    isSaving: boolean;

    groupes: Groupe[];

    utilisateurs: Utilisateur[];

    descriptions: Description[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private coursService: CoursService,
        private groupeService: GroupeService,
        private utilisateurService: UtilisateurService,
        private descriptionService: DescriptionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.groupeService.query()
            .subscribe((res: HttpResponse<Groupe[]>) => { this.groupes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.utilisateurService.query()
            .subscribe((res: HttpResponse<Utilisateur[]>) => { this.utilisateurs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.descriptionService.query()
            .subscribe((res: HttpResponse<Description[]>) => { this.descriptions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cours.id !== undefined) {
            this.subscribeToSaveResponse(
                this.coursService.update(this.cours));
        } else {
            this.subscribeToSaveResponse(
                this.coursService.create(this.cours));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Cours>>) {
        result.subscribe((res: HttpResponse<Cours>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Cours) {
        this.eventManager.broadcast({ name: 'coursListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackGroupeById(index: number, item: Groupe) {
        return item.id;
    }

    trackUtilisateurById(index: number, item: Utilisateur) {
        return item.id;
    }

    trackDescriptionById(index: number, item: Description) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-cours-popup',
    template: ''
})
export class CoursPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private coursPopupService: CoursPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.coursPopupService
                    .open(CoursDialogComponent as Component, params['id']);
            } else {
                this.coursPopupService
                    .open(CoursDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
