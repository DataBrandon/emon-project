import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartmeterComponent } from './smartmeter.component';

describe('SmartmeterComponent', () => {
  let component: SmartmeterComponent;
  let fixture: ComponentFixture<SmartmeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartmeterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartmeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
