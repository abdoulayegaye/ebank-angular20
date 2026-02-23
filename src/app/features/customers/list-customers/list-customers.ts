import {Component, Input, Output, EventEmitter} from '@angular/core';
import { AllCustomersResponse } from '../models/all-customers-response';
import { FormsModule } from '@angular/forms';
import {CustomerResponse} from '../models/customer-response';

@Component({
  selector: 'app-list-customers',
  imports: [FormsModule],
  templateUrl: './list-customers.html',
  styleUrl: './list-customers.css',
})
export class ListCustomers {

  @Input() customers:     CustomerResponse[] = [];
  @Input() totalElements: number = 0;
  @Input() totalPages:    number = 0;
  @Input() currentPage:   number = 0;
  @Input() pageSize:      number = 5;
  @Input() searchQuery:   string = '';
  @Input() isLoading:     boolean = false;

  // Events vers le parent
  @Output() onSearch         = new EventEmitter<string>();
  @Output() onClearSearch    = new EventEmitter<void>();
  @Output() onPageChange     = new EventEmitter<number>();
  @Output() onPageSizeChange = new EventEmitter<number>();

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
}
