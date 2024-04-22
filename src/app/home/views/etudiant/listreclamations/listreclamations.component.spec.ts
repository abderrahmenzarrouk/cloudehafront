import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListreclamationsComponent } from './listreclamations.component';

describe('ListreclamationsComponent', () => {
  let component: ListreclamationsComponent;
  let fixture: ComponentFixture<ListreclamationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListreclamationsComponent]
    });
    fixture = TestBed.createComponent(ListreclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
