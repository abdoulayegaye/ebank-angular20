import {Component, Input} from '@angular/core';
import {AllCustomersResponse} from '../models/all-customers-response';

@Component({
  selector: 'app-list-customers',
  imports: [],
  templateUrl: './list-customers.html',
  styleUrl: './list-customers.css',
})
export class ListCustomers {
  @Input() allCustomers: AllCustomersResponse={customers: []};
}
