/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ItbadgeTestModule } from '../../../test.module';
import { DescriptionComponent } from '../../../../../../main/webapp/app/entities/description/description.component';
import { DescriptionService } from '../../../../../../main/webapp/app/entities/description/description.service';
import { Description } from '../../../../../../main/webapp/app/entities/description/description.model';

describe('Component Tests', () => {

    describe('Description Management Component', () => {
        let comp: DescriptionComponent;
        let fixture: ComponentFixture<DescriptionComponent>;
        let service: DescriptionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ItbadgeTestModule],
                declarations: [DescriptionComponent],
                providers: [
                    DescriptionService
                ]
            })
            .overrideTemplate(DescriptionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DescriptionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DescriptionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Description(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.descriptions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
