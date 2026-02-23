import {Component, inject, OnInit, signal} from '@angular/core';
import {Header} from '../../shared/components/header/header';
import {ListCustomers} from './list-customers/list-customers';
import {CustomersService} from './services/customers';
import {HttpError} from '../../shared/services/http-error';
import {CustomerResponse} from './models/customer-response';
import {FormCustomers} from './form-customers/form-customers';
import {Footer} from '../../shared/components/footer/footer';
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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

  customerService  = inject(CustomersService);
  httpErrorService = inject(HttpError);

  customers  = signal<CustomerResponse[]>([]);
  totalElements = signal<number>(0);
  totalPages    = signal<number>(0);
  currentPage   = signal<number>(0);
  pageSize      = signal<number>(5);
  searchQuery   = signal<string>('');
  isLoading     = signal<boolean>(false);

  private search$ = new Subject<string>();

  get pages(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i);
  }

  constructor() {
    this.search$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      takeUntilDestroyed()
    ).subscribe(query => this.getAllCustomers(0, this.pageSize(), query));
  }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers(page: number = 0, size: number = this.pageSize(), query: string = this.searchQuery()): void {
    this.isLoading.set(true);

    this.customerService
      .search(query, page, size)
      .subscribe({
        next: (response) => {
          console.log('RESPONSE:', response);
          this.customers.set(response.data.content);
          this.totalElements.set(response.data.totalElements);
          this.totalPages.set(response.data.totalPages);
          this.currentPage.set(response.data.page ?? response.data.page ?? page);
          this.isLoading.set(false);
        },
        error: (error) => {
          this.httpErrorService.handleError(error);
          this.isLoading.set(false);
        }
      });
  }

  onSearch(query: string):   void { this.searchQuery.set(query); this.search$.next(query); }
  clearSearch():             void { this.searchQuery.set(''); this.getAllCustomers(0); }
  loadPage(page: number):    void { this.getAllCustomers(page, this.pageSize(), this.searchQuery()); }
  goToPage(page: number): void {
    console.log('goToPage:', page, '| totalPages:', this.totalPages(), '| currentPage:', this.currentPage());
    if (page < 0 || page >= this.totalPages()) {
      console.log('BLOQUÉ — hors bornes');
      return;
    }
    this.getAllCustomers(page, this.pageSize(), this.searchQuery());
  }
  previousPage():            void { this.goToPage(this.currentPage() - 1); }
  nextPage():                void { this.goToPage(this.currentPage() + 1); }

  getAllCustomersAfterSave(): void {
    this.currentPage.set(0);
    this.getAllCustomers(0, this.pageSize(), this.searchQuery());
  }
}
