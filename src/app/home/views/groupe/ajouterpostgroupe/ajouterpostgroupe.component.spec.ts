import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterpostgroupeComponent } from './ajouterpostgroupe.component';

describe('AjouterpostgroupeComponent', () => {
  let component: AjouterpostgroupeComponent;
  let fixture: ComponentFixture<AjouterpostgroupeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterpostgroupeComponent]
    });
    fixture = TestBed.createComponent(AjouterpostgroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
