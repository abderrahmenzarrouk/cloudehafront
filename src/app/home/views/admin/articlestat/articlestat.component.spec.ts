import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlestatComponent } from './articlestat.component';

describe('ArticlestatComponent', () => {
  let component: ArticlestatComponent;
  let fixture: ComponentFixture<ArticlestatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlestatComponent]
    });
    fixture = TestBed.createComponent(ArticlestatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
