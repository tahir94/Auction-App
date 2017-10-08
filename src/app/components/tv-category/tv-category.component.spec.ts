import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvCategoryComponent } from './tv-category.component';

describe('TvCategoryComponent', () => {
  let component: TvCategoryComponent;
  let fixture: ComponentFixture<TvCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
