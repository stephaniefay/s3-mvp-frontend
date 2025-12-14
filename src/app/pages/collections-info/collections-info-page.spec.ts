import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsInfoPage } from './collections-info-page';

describe('CollectionsInfoPage', () => {
  let component: CollectionsInfoPage;
  let fixture: ComponentFixture<CollectionsInfoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionsInfoPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionsInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
