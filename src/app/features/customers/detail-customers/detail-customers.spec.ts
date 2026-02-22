import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCustomers } from './detail-customers';

describe('DetailCustomers', () => {
  let component: DetailCustomers;
  let fixture: ComponentFixture<DetailCustomers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCustomers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCustomers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
