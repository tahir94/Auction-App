import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootDashboardComponent } from './root-dashboard.component';

describe('RootDashboardComponent', () => {
  let component: RootDashboardComponent;
  let fixture: ComponentFixture<RootDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
