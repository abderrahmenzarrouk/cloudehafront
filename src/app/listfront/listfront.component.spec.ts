import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListfrontComponent } from './listfront.component';

describe('ListfrontComponent', () => {
  let component: ListfrontComponent;
  let fixture: ComponentFixture<ListfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListfrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
