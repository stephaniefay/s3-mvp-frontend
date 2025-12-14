import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateCw } from './dialog-create-cw';

describe('DialogCreateCw', () => {
  let component: DialogCreateCw;
  let fixture: ComponentFixture<DialogCreateCw>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreateCw]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateCw);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
