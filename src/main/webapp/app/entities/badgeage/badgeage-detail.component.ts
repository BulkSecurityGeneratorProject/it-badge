import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Badgeage } from './badgeage.model';
import { BadgeageService } from './badgeage.service';

@Component({
    selector: 'jhi-badgeage-detail',
    templateUrl: './badgeage-detail.component.html'
})
export class BadgeageDetailComponent implements OnInit, OnDestroy {

    badgeage: Badgeage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private badgeageService: BadgeageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBadgeages();
    }

    load(id) {
        this.badgeageService.find(id)
            .subscribe((badgeageResponse: HttpResponse<Badgeage>) => {
                this.badgeage = badgeageResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBadgeages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'badgeageListModification',
            (response) => this.load(this.badgeage.id)
        );
    }
}
