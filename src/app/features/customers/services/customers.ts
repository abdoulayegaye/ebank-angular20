import { Injectable } from '@angular/core';
import {CrudService} from '../../../shared/services/crud';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersService extends CrudService {

  search<T>(query: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}customers/search?q=${query}`);
  }
}
