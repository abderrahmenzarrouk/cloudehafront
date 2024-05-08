import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileetudiantComponent } from './profileetudiant.component';

describe('ProfileetudiantComponent', () => {
  let component: ProfileetudiantComponent;
  let fixture: ComponentFixture<ProfileetudiantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileetudiantComponent]
    });
    fixture = TestBed.createComponent(ProfileetudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
