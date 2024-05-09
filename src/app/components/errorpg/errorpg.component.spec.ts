import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorpgComponent } from './errorpg.component';

describe('ErrorpgComponent', () => {
  let component: ErrorpgComponent;
  let fixture: ComponentFixture<ErrorpgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorpgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErrorpgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
