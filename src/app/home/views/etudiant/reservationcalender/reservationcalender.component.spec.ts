import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationcalenderComponent } from './reservationcalender.component';

describe('ReservationcalenderComponent', () => {
  let component: ReservationcalenderComponent;
  let fixture: ComponentFixture<ReservationcalenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationcalenderComponent]
    });
    fixture = TestBed.createComponent(ReservationcalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
