import {Component, inject} from '@angular/core';
import {MdbModalRef} from 'mdb-angular-ui-kit/modal';
import {CustomerResponse} from '../models/customer-response';

@Component({
  selector: 'app-detail-customers',
  imports: [],
  templateUrl: './detail-customers.html',
  styleUrl: './detail-customers.css',
})
export class DetailCustomers {

  modalRef = inject(MdbModalRef<DetailCustomers>);
  customer: CustomerResponse | null = null;

  get initials(): string {
    return this.customer?.name
      ? this.customer.name.split(' ').map(w => w.charAt(0)).join('').toUpperCase().slice(0, 2)
      : '?';
  }

}
