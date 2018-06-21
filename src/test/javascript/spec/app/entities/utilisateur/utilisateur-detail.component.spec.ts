/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ItbadgeTestModule } from '../../../test.module';
import { UtilisateurDetailComponent } from '../../../../../../main/webapp/app/entities/utilisateur/utilisateur-detail.component';
import { UtilisateurService } from '../../../../../../main/webapp/app/entities/utilisateur/utilisateur.service';
import { Utilisateur } from '../../../../../../main/webapp/app/entities/utilisateur/utilisateur.model';

describe('Component Tests', () => {

    describe('Utilisateur Management Detail Component', () => {
        let comp: UtilisateurDetailComponent;
        let fixture: ComponentFixture<UtilisateurDetailComponent>;
        let service: UtilisateurService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ItbadgeTestModule],
                declarations: [UtilisateurDetailComponent],
                providers: [
                    UtilisateurService
                ]
            })
            .overrideTemplate(UtilisateurDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UtilisateurDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UtilisateurService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Utilisateur(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.utilisateur).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
