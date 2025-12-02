import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetsPage } from './sets-page.component';

describe('Sets', () => {
  let component: SetsPage;
  let fixture: ComponentFixture<SetsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
