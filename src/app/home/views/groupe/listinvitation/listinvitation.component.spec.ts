import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListinvitationComponent } from './listinvitation.component';

describe('ListinvitationComponent', () => {
  let component: ListinvitationComponent;
  let fixture: ComponentFixture<ListinvitationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListinvitationComponent]
    });
    fixture = TestBed.createComponent(ListinvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
