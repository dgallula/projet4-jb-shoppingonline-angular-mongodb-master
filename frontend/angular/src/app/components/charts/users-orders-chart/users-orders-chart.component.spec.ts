import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersOrdersChartComponent } from './users-orders-chart.component';

describe('UsersOrdersChartComponent', () => {
  let component: UsersOrdersChartComponent;
  let fixture: ComponentFixture<UsersOrdersChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersOrdersChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersOrdersChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
