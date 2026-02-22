import { Injectable } from '@angular/core';
import {CrudService} from '../../../shared/services/crud';

@Injectable({
  providedIn: 'root',
})
export class CustomersService extends CrudService {

  /*getSectorsByName(name: string): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(`${this.baseUrl}/${name}`);
  }

  checkSector(sectorName: string) {

    return this.getByName(sectorName).pipe(
      map(result => {
        return result.id ? {response: true} : {response: false};
      }),
      catchError(() => {
          return of({response: false});
        }
      )
    );
  }*/

}
