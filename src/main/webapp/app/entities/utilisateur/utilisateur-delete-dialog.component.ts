import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Utilisateur } from './utilisateur.model';
import { UtilisateurPopupService } from './utilisateur-popup.service';
import { UtilisateurService } from './utilisateur.service';

@Component({
    selector: 'jhi-utilisateur-delete-dialog',
    templateUrl: './utilisateur-delete-dialog.component.html'
})
export class UtilisateurDeleteDialogComponent {

    utilisateur: Utilisateur;

    constructor(
        private utilisateurService: UtilisateurService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.utilisateurService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'utilisateurListModification',
                content: 'Deleted an utilisateur'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-utilisateur-delete-popup',
    template: ''
})
export class UtilisateurDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private utilisateurPopupService: UtilisateurPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.utilisateurPopupService
                .open(UtilisateurDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
