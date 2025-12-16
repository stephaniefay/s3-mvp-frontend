import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CWInfoPage } from './c-w-info-page.component';

describe('CollectionsInfoPage', () => {
  let component: CWInfoPage;
  let fixture: ComponentFixture<CWInfoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CWInfoPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CWInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
