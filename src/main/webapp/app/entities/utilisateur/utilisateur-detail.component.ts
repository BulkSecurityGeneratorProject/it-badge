import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Utilisateur } from './utilisateur.model';
import { UtilisateurService } from './utilisateur.service';

@Component({
    selector: 'jhi-utilisateur-detail',
    templateUrl: './utilisateur-detail.component.html'
})
export class UtilisateurDetailComponent implements OnInit, OnDestroy {

    utilisateur: Utilisateur;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private utilisateurService: UtilisateurService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUtilisateurs();
    }

    load(id) {
        this.utilisateurService.find(id)
            .subscribe((utilisateurResponse: HttpResponse<Utilisateur>) => {
                this.utilisateur = utilisateurResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUtilisateurs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'utilisateurListModification',
            (response) => this.load(this.utilisateur.id)
        );
    }
}
