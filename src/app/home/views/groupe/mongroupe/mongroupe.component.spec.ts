import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MongroupeComponent } from './mongroupe.component';

describe('MongroupeComponent', () => {
  let component: MongroupeComponent;
  let fixture: ComponentFixture<MongroupeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MongroupeComponent]
    });
    fixture = TestBed.createComponent(MongroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
