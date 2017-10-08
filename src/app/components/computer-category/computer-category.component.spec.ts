import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerCategoryComponent } from './computer-category.component';

describe('ComputerCategoryComponent', () => {
  let component: ComputerCategoryComponent;
  let fixture: ComponentFixture<ComputerCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
