import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEligComponent } from './add-elig.component';

describe('AddEligComponent', () => {
  let component: AddEligComponent;
  let fixture: ComponentFixture<AddEligComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEligComponent]
    });
    fixture = TestBed.createComponent(AddEligComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
