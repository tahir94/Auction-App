import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneCategoryComponent } from './phone-category.component';

describe('PhoneCategoryComponent', () => {
  let component: PhoneCategoryComponent;
  let fixture: ComponentFixture<PhoneCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
