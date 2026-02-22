import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCustomers } from './form-customers';

describe('FormCustomers', () => {
  let component: FormCustomers;
  let fixture: ComponentFixture<FormCustomers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCustomers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCustomers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
