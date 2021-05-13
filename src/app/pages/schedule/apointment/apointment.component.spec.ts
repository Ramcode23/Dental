import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApointmentComponent } from './apointment.component';

describe('ApointmentComponent', () => {
  let component: ApointmentComponent;
  let fixture: ComponentFixture<ApointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
