import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoistmeterDetailComponent } from './moistmeter-detail.component';

describe('MoistmeterDetailComponent', () => {
  let component: MoistmeterDetailComponent;
  let fixture: ComponentFixture<MoistmeterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoistmeterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoistmeterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
