import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDisplayFullComponent } from './set-display-full.component';

describe('SetDisplayFull', () => {
  let component: SetDisplayFullComponent;
  let fixture: ComponentFixture<SetDisplayFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetDisplayFullComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetDisplayFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
