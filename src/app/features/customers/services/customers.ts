import { Injectable } from '@angular/core';
import {CrudService} from '../../../shared/services/crud';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../../shared/models/api-response';
import {CustomerResponse} from '../models/customer-response';
import {PageResponse} from '../../../shared/models/page-response.model';

@Injectable({
  providedIn: 'root',
})
export class CustomersService extends CrudService {

  search(query: string, page: number, size: number): Observable<ApiResponse<PageResponse<CustomerResponse>>> {
    return this.http.get<ApiResponse<PageResponse<CustomerResponse>>>(
      `${this.baseUrl}/customers/search?q=${query}&page=${page}&size=${size}`
    );
  }

}
