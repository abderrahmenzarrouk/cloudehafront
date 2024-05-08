import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtuteurComponent } from './listtuteur.component';

describe('ListtuteurComponent', () => {
  let component: ListtuteurComponent;
  let fixture: ComponentFixture<ListtuteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListtuteurComponent]
    });
    fixture = TestBed.createComponent(ListtuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
