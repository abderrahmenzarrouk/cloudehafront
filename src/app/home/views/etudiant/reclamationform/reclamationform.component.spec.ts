import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationformComponent } from './reclamationform.component';

describe('ReclamationformComponent', () => {
  let component: ReclamationformComponent;
  let fixture: ComponentFixture<ReclamationformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReclamationformComponent]
    });
    fixture = TestBed.createComponent(ReclamationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
