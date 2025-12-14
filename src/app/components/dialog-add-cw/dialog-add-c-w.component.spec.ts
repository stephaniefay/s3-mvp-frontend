import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddCW } from './dialog-add-c-w.component';

describe('DynamicDialogComponent', () => {
  let component: DialogAddCW;
  let fixture: ComponentFixture<DialogAddCW>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddCW]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddCW);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
