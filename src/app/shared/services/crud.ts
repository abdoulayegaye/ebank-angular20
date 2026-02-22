import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {

  baseUrl = '/api/v1';
  http = inject(HttpClient);

  save<E,T>(uri: string, dataRequest: E): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${uri}`, dataRequest);
  }

  update<E,T>(uri: string, dataRequest: E, id: number): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${uri}/${id}`, dataRequest);
  }

  delete<T>(uri: string, id: number): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${uri}/${id}`);
  }

  all<T>(uri: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${uri}`);
  }

  getById<T>(uri: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${uri}/${id}`);
  }

  getByName<T>(uri: string, name: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${uri}/${name}`);
  }
}
