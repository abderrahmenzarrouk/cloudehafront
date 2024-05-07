import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesusersComponent } from './statistiquesusers.component';

describe('StatistiquesusersComponent', () => {
  let component: StatistiquesusersComponent;
  let fixture: ComponentFixture<StatistiquesusersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatistiquesusersComponent]
    });
    fixture = TestBed.createComponent(StatistiquesusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
