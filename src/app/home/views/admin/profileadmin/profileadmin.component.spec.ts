import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileadminComponent } from './profileadmin.component';

describe('ProfileadminComponent', () => {
  let component: ProfileadminComponent;
  let fixture: ComponentFixture<ProfileadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileadminComponent]
    });
    fixture = TestBed.createComponent(ProfileadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
