/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ItbadgeTestModule } from '../../../test.module';
import { UtilisateurComponent } from '../../../../../../main/webapp/app/entities/utilisateur/utilisateur.component';
import { UtilisateurService } from '../../../../../../main/webapp/app/entities/utilisateur/utilisateur.service';
import { Utilisateur } from '../../../../../../main/webapp/app/entities/utilisateur/utilisateur.model';

describe('Component Tests', () => {

    describe('Utilisateur Management Component', () => {
        let comp: UtilisateurComponent;
        let fixture: ComponentFixture<UtilisateurComponent>;
        let service: UtilisateurService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ItbadgeTestModule],
                declarations: [UtilisateurComponent],
                providers: [
                    UtilisateurService
                ]
            })
            .overrideTemplate(UtilisateurComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UtilisateurComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UtilisateurService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Utilisateur(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.utilisateurs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
