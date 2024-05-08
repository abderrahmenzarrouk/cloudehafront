import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationtuteurComponent } from './reclamationtuteur.component';

describe('ReclamationtuteurComponent', () => {
  let component: ReclamationtuteurComponent;
  let fixture: ComponentFixture<ReclamationtuteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReclamationtuteurComponent]
    });
    fixture = TestBed.createComponent(ReclamationtuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
