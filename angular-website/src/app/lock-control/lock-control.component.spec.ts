import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockControlComponent } from './lock-control.component';

describe('LockControlComponent', () => {
  let component: LockControlComponent;
  let fixture: ComponentFixture<LockControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LockControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LockControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
