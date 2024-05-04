import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseventsComponent } from './resevents.component';

describe('ReseventsComponent', () => {
  let component: ReseventsComponent;
  let fixture: ComponentFixture<ReseventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReseventsComponent]
    });
    fixture = TestBed.createComponent(ReseventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
