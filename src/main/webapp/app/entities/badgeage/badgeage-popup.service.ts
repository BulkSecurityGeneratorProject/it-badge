import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Badgeage } from './badgeage.model';
import { BadgeageService } from './badgeage.service';

@Injectable()
export class BadgeagePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private badgeageService: BadgeageService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.badgeageService.find(id)
                    .subscribe((badgeageResponse: HttpResponse<Badgeage>) => {
                        const badgeage: Badgeage = badgeageResponse.body;
                        if (badgeage.currentDate) {
                            badgeage.currentDate = {
                                year: badgeage.currentDate.getFullYear(),
                                month: badgeage.currentDate.getMonth() + 1,
                                day: badgeage.currentDate.getDate()
                            };
                        }
                        badgeage.badgeageEleve = this.datePipe
                            .transform(badgeage.badgeageEleve, 'yyyy-MM-ddTHH:mm:ss');
                        badgeage.badgeageCorrige = this.datePipe
                            .transform(badgeage.badgeageCorrige, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.badgeageModalRef(component, badgeage);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.badgeageModalRef(component, new Badgeage());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    badgeageModalRef(component: Component, badgeage: Badgeage): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.badgeage = badgeage;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
