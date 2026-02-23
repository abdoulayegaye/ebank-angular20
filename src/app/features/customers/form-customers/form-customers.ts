import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CustomerRequest } from "../models/customer-request";
import {HttpError} from '../../../shared/services/http-error';
import {AllCustomersResponse} from '../models/all-customers-response';
import {MdbModalRef, MdbModalService} from 'mdb-angular-ui-kit/modal';
import {ErrorModal} from '../../../shared/components/error-modal/error-modal';
import {ConfirmModal} from '../../../shared/components/confirm-modal/confirm-modal';
import {CustomersService} from '../services/customers';
import {CustomerResponse} from '../models/customer-response';
import {emailExistsValidator} from '../validations/email-exists.validator';
import {ApiResponse} from '../../../shared/models/api-response';

@Component({
  selector: 'app-form-customers',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './form-customers.html',
  styleUrl: './form-customers.css',
})
export class FormCustomers {

  customerService = inject(CustomersService);
  newCustomerForm: FormGroup = this.createCustomerForm();
  fb: FormBuilder = inject(FormBuilder);
  customerRequest: CustomerRequest = {};
  httpErrorService = inject(HttpError);
  allCustomers: AllCustomersResponse={customers: []};
  @Output() loadAllCustomersAfterAddEvent = new EventEmitter<AllCustomersResponse>();
  confirmModalRef: MdbModalRef<ConfirmModal> | null = null;
  errorModalRef: MdbModalRef<ErrorModal> | null = null;
  modalService = inject(MdbModalService);

  private createCustomerForm() {
    return new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl(
        "",
        [Validators.required, Validators.email],  // sync validators
        [emailExistsValidator()]                  // async validator 👈
      )
    });
  }

  private initForm() {
    return this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]]
    }, {},);
  }

  onSubmit() {
    this.customerRequest = {
      name: this.newCustomerForm.get("name")!.value,
      email: this.newCustomerForm.get("email")!.value,
    }
    this.customerService.save<CustomerRequest, CustomerResponse>('customers', this.customerRequest).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          this.httpErrorService.handleError(error);
          this.errorModalRef = this.modalService.open(ErrorModal);
        },
        complete: () => {
          console.log('save complete');
          this.confirmModalRef = this.modalService.open(ConfirmModal, {modalClass: 'modal-dialog-centered modal-sm'});
          this.getAllCustomers();
          this.newCustomerForm.reset();
        }
      }
    );
  }

  isValidTouchedOrDirty(fieldName: string) {
    return this.newCustomerForm.controls[fieldName].invalid &&
      (this.newCustomerForm.controls[fieldName].touched ||
        this.newCustomerForm.controls[fieldName].dirty);
  }

  nameIsValidTouchedOrDirty() {
    return this.newCustomerForm.controls['name'].invalid &&
      (this.newCustomerForm.controls['name'].touched ||
        this.newCustomerForm.controls['name'].dirty);
  }

  emailIsValidTouchedOrDirty() {
    return this.newCustomerForm.controls['email'].invalid &&
      (this.newCustomerForm.controls['email'].touched ||
        this.newCustomerForm.controls['email'].dirty);
  }

  fieldHasError(fieldName: string, errorValue: string) {
    return this.newCustomerForm.controls[fieldName].errors?.[errorValue];
  }

  getAllCustomers () {
    this.customerService.all<ApiResponse<CustomerResponse[]>>('customers').subscribe({
        next: (response) => {
          this.allCustomers.customers = response.data;
          this.loadAllCustomersAfterAddEvent.emit(this.allCustomers);
          console.log(this.allCustomers)
        },
        error: (error) => {
          this.httpErrorService.handleError(error);
        },
        complete: () => {
          console.log('getting all sectors after save complete');
        }
      }
    );
  }
}
