import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsPage } from './collections-page.component';

describe('Collections', () => {
  let component: CollectionsPage;
  let fixture: ComponentFixture<CollectionsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
