import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiletuteurComponent } from './profiletuteur.component';

describe('ProfiletuteurComponent', () => {
  let component: ProfiletuteurComponent;
  let fixture: ComponentFixture<ProfiletuteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfiletuteurComponent]
    });
    fixture = TestBed.createComponent(ProfiletuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
