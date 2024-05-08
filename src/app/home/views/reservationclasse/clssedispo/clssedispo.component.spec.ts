import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClssedispoComponent } from './clssedispo.component';

describe('ClssedispoComponent', () => {
  let component: ClssedispoComponent;
  let fixture: ComponentFixture<ClssedispoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClssedispoComponent]
    });
    fixture = TestBed.createComponent(ClssedispoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
