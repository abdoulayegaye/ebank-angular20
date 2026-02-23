import { inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, map, catchError, of, debounceTime, switchMap, first } from 'rxjs';
import { CustomersService } from '../services/customers';

export function emailExistsValidator(): AsyncValidatorFn {

  const customerService = inject(CustomersService);

  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) return of(null);

    return control.valueChanges.pipe(
      debounceTime(500),           // attendre 500ms après la dernière frappe
      switchMap(email =>
        customerService.all<any>(`customers/check-email?email=${email}`).pipe(
          map(response => response.data ? { EMAIL_EXIST: true } : null),
          catchError(() => of(null))
        )
      ),
      first()
    );
  };
}
