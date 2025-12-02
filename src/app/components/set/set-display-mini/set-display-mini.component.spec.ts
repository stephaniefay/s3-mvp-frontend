import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDisplayMiniComponent } from './set-display-mini.component';

describe('SetDisplayMini', () => {
  let component: SetDisplayMiniComponent;
  let fixture: ComponentFixture<SetDisplayMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetDisplayMiniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetDisplayMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
