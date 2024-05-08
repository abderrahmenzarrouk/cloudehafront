import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationeducativesComponent } from './reclamationeducatives.component';

describe('ReclamationeducativesComponent', () => {
  let component: ReclamationeducativesComponent;
  let fixture: ComponentFixture<ReclamationeducativesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReclamationeducativesComponent]
    });
    fixture = TestBed.createComponent(ReclamationeducativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
