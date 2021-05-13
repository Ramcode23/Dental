import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatiensComponent } from './patiens.component';

describe('PatiensComponent', () => {
  let component: PatiensComponent;
  let fixture: ComponentFixture<PatiensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatiensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatiensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
