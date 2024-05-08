import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutertuteurComponent } from './ajoutertuteur.component';

describe('AjoutertuteurComponent', () => {
  let component: AjoutertuteurComponent;
  let fixture: ComponentFixture<AjoutertuteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutertuteurComponent]
    });
    fixture = TestBed.createComponent(AjoutertuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
