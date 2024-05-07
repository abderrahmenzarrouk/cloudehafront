import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseajoutComponent } from './classeajout.component';

describe('ClasseajoutComponent', () => {
  let component: ClasseajoutComponent;
  let fixture: ComponentFixture<ClasseajoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClasseajoutComponent]
    });
    fixture = TestBed.createComponent(ClasseajoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
