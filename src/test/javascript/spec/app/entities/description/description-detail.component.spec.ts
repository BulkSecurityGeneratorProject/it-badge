/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ItbadgeTestModule } from '../../../test.module';
import { DescriptionDetailComponent } from '../../../../../../main/webapp/app/entities/description/description-detail.component';
import { DescriptionService } from '../../../../../../main/webapp/app/entities/description/description.service';
import { Description } from '../../../../../../main/webapp/app/entities/description/description.model';

describe('Component Tests', () => {

    describe('Description Management Detail Component', () => {
        let comp: DescriptionDetailComponent;
        let fixture: ComponentFixture<DescriptionDetailComponent>;
        let service: DescriptionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ItbadgeTestModule],
                declarations: [DescriptionDetailComponent],
                providers: [
                    DescriptionService
                ]
            })
            .overrideTemplate(DescriptionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DescriptionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DescriptionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Description(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.description).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
