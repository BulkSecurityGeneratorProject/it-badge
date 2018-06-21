import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Cours } from './cours.model';
import { CoursService } from './cours.service';

@Injectable()
export class CoursPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private coursService: CoursService

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
                this.coursService.find(id)
                    .subscribe((coursResponse: HttpResponse<Cours>) => {
                        const cours: Cours = coursResponse.body;
                        if (cours.dateDebut) {
                            cours.dateDebut = {
                                year: cours.dateDebut.getFullYear(),
                                month: cours.dateDebut.getMonth() + 1,
                                day: cours.dateDebut.getDate()
                            };
                        }
                        if (cours.dateFin) {
                            cours.dateFin = {
                                year: cours.dateFin.getFullYear(),
                                month: cours.dateFin.getMonth() + 1,
                                day: cours.dateFin.getDate()
                            };
                        }
                        this.ngbModalRef = this.coursModalRef(component, cours);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.coursModalRef(component, new Cours());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    coursModalRef(component: Component, cours: Cours): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cours = cours;
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
