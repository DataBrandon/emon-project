import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoistSensorComponent } from './moist-sensor.component';

describe('MoistSensorComponent', () => {
  let component: MoistSensorComponent;
  let fixture: ComponentFixture<MoistSensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoistSensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoistSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
