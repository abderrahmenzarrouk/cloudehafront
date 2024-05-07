import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEligibilitiesComponent } from './list-eligibilities.component';

describe('ListEligibilitiesComponent', () => {
  let component: ListEligibilitiesComponent;
  let fixture: ComponentFixture<ListEligibilitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListEligibilitiesComponent]
    });
    fixture = TestBed.createComponent(ListEligibilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
