import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockMonitorComponent } from './lock-monitor.component';

describe('LockMonitorComponent', () => {
  let component: LockMonitorComponent;
  let fixture: ComponentFixture<LockMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LockMonitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LockMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
