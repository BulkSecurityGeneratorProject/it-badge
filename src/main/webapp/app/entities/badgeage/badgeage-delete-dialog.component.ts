import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Badgeage } from './badgeage.model';
import { BadgeagePopupService } from './badgeage-popup.service';
import { BadgeageService } from './badgeage.service';

@Component({
    selector: 'jhi-badgeage-delete-dialog',
    templateUrl: './badgeage-delete-dialog.component.html'
})
export class BadgeageDeleteDialogComponent {

    badgeage: Badgeage;

    constructor(
        private badgeageService: BadgeageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.badgeageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'badgeageListModification',
                content: 'Deleted an badgeage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-badgeage-delete-popup',
    template: ''
})
export class BadgeageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private badgeagePopupService: BadgeagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.badgeagePopupService
                .open(BadgeageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
