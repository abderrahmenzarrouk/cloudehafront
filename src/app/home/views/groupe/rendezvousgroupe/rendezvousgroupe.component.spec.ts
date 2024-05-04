import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezvousgroupeComponent } from './rendezvousgroupe.component';

describe('RendezvousgroupeComponent', () => {
  let component: RendezvousgroupeComponent;
  let fixture: ComponentFixture<RendezvousgroupeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RendezvousgroupeComponent]
    });
    fixture = TestBed.createComponent(RendezvousgroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
