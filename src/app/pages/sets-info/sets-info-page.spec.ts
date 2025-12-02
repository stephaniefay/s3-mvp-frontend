import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetsInfoPage } from './sets-info-page';

describe('SetsInfoPage', () => {
  let component: SetsInfoPage;
  let fixture: ComponentFixture<SetsInfoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetsInfoPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetsInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
