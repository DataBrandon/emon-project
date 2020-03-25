import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartmeterDetailComponent } from './smartmeter-detail.component';

describe('SmartmeterDetailComponent', () => {
  let component: SmartmeterDetailComponent;
  let fixture: ComponentFixture<SmartmeterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartmeterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartmeterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
