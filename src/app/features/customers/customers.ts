import {Component, inject, OnInit} from '@angular/core';
import {Header} from '../../shared/components/header/header';
import {ListCustomers} from './list-customers/list-customers';
import {CustomersService} from './services/customers';
import {HttpError} from '../../shared/services/http-error';
import {AllCustomersResponse} from './models/all-customers-response';
import {CustomerResponse} from './models/customer-response';
import {FormCustomers} from './form-customers/form-customers';
import {Footer} from '../../shared/components/footer/footer';
import {ApiResponse} from '../../shared/models/api-response';

@Component({
  selector: 'app-customers',
  imports: [
    Header,
    ListCustomers,
    FormCustomers,
    Footer
  ],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers implements OnInit {

  customerService = inject(CustomersService);
  httpErrorService = inject(HttpError);
  listCustomers: AllCustomersResponse={customers: []};

  ngOnInit() {
    this.getAllCustomers();
  }

  getAllCustomers(){
    this.customerService.all<ApiResponse<CustomerResponse[]>>('customers').subscribe({
        next: (response) => {
          this.listCustomers.customers = response.data;
          console.log(this.listCustomers);
        },
        error: (error) => {
          this.httpErrorService.handleError(error);
        },
        complete: () => {
          console.log('complete');
        }
      }
    );
  }

  getAllCustomersAfterSave(customers: AllCustomersResponse){
    this.listCustomers = customers;
  }
}
