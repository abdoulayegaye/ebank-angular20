import { Component, Input, signal, computed, OnChanges, SimpleChanges, inject, OnDestroy } from '@angular/core';
import { AllCustomersResponse } from '../models/all-customers-response';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomersService } from '../services/customers';
import { Subject, debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list-customers',
  imports: [NgClass, FormsModule],
  templateUrl: './list-customers.html',
  styleUrl: './list-customers.css',
})
export class ListCustomers implements OnChanges {

  @Input() allCustomers: AllCustomersResponse = { customers: [] };

  customerService = inject(CustomersService);

  // Recherche
  searchQuery     = signal<string>('');
  isSearching     = signal<boolean>(false);
  searchResults   = signal<any[]>([]);
  isApiSearch     = signal<boolean>(false); // true = résultats viennent de l'API

  // Pagination
  currentPage = signal<number>(1);
  pageSize    = signal<number>(5);

  // Subject pour debounce de la recherche API
  private search$ = new Subject<string>();

  constructor() {
    // Recherche API avec debounce 400ms
    this.search$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(query => {
        if (!query.trim()) {
          this.isApiSearch.set(false);
          this.isSearching.set(false);
          return of(null);
        }
        this.isSearching.set(true);
        return this.customerService.search<any>(query);
      }),
      takeUntilDestroyed()
    ).subscribe({
      next: (results) => {
        if (results) {
          this.searchResults.set(results.data ?? results);
          this.isApiSearch.set(true);
        }
        this.isSearching.set(false);
        this.currentPage.set(1);
      },
      error: () => {
        this.isSearching.set(false);
        this.isApiSearch.set(false);
      }
    });
  }

  // Recherche locale sur les données déjà chargées
  get filteredCustomers() {
    const query = this.searchQuery().toLowerCase().trim();

    // Si recherche API active → utilise les résultats API
    if (this.isApiSearch()) return this.searchResults();

    // Sinon → filtre local
    if (!query) return this.allCustomers.customers;

    return this.allCustomers.customers.filter(c =>
      c.name?.toLowerCase().includes(query) ||
      c.email?.toLowerCase().includes(query) ||
      c.id?.toString().includes(query)
    );
  }

  get paginatedCustomers() {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredCustomers.slice(start, start + this.pageSize());
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCustomers.length / this.pageSize());
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
    this.currentPage.set(1);
    this.search$.next(query); // déclenche la recherche API
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.isApiSearch.set(false);
    this.searchResults.set([]);
    this.currentPage.set(1);
    this.search$.next('');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allCustomers']) {
      this.currentPage.set(1);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage.set(page);
    }
  }

  previousPage(): void { this.goToPage(this.currentPage() - 1); }
  nextPage():     void { this.goToPage(this.currentPage() + 1); }
}
