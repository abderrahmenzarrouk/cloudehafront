import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationtechniquesComponent } from './reclamationtechniques.component';

describe('ReclamationtechniquesComponent', () => {
  let component: ReclamationtechniquesComponent;
  let fixture: ComponentFixture<ReclamationtechniquesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReclamationtechniquesComponent]
    });
    fixture = TestBed.createComponent(ReclamationtechniquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
