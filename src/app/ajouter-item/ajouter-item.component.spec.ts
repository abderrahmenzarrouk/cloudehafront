import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterItemComponent } from './ajouter-item.component';

describe('AjouterItemComponent', () => {
  let component: AjouterItemComponent;
  let fixture: ComponentFixture<AjouterItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
