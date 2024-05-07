import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatclasseComponent } from './statclasse.component';

describe('StatclasseComponent', () => {
  let component: StatclasseComponent;
  let fixture: ComponentFixture<StatclasseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatclasseComponent]
    });
    fixture = TestBed.createComponent(StatclasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
