import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatienComponent } from './patien.component';

describe('PatienComponent', () => {
  let component: PatienComponent;
  let fixture: ComponentFixture<PatienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
