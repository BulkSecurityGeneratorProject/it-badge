import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Utilisateur } from './utilisateur.model';
import { UtilisateurPopupService } from './utilisateur-popup.service';
import { UtilisateurService } from './utilisateur.service';
import { Groupe, GroupeService } from '../groupe';
import { Cours, CoursService } from '../cours';

@Component({
    selector: 'jhi-utilisateur-dialog',
    templateUrl: './utilisateur-dialog.component.html'
})
export class UtilisateurDialogComponent implements OnInit {

    utilisateur: Utilisateur;
    isSaving: boolean;

    groupes: Groupe[];

    cours: Cours[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private utilisateurService: UtilisateurService,
        private groupeService: GroupeService,
        private coursService: CoursService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.groupeService.query()
            .subscribe((res: HttpResponse<Groupe[]>) => { this.groupes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.coursService.query()
            .subscribe((res: HttpResponse<Cours[]>) => { this.cours = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.utilisateur.id !== undefined) {
            this.subscribeToSaveResponse(
                this.utilisateurService.update(this.utilisateur));
        } else {
            this.subscribeToSaveResponse(
                this.utilisateurService.create(this.utilisateur));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Utilisateur>>) {
        result.subscribe((res: HttpResponse<Utilisateur>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Utilisateur) {
        this.eventManager.broadcast({ name: 'utilisateurListModification', content: 'OK'});
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

    trackCoursById(index: number, item: Cours) {
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
    selector: 'jhi-utilisateur-popup',
    template: ''
})
export class UtilisateurPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private utilisateurPopupService: UtilisateurPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.utilisateurPopupService
                    .open(UtilisateurDialogComponent as Component, params['id']);
            } else {
                this.utilisateurPopupService
                    .open(UtilisateurDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
