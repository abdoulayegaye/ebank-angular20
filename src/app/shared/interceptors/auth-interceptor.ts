import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {Storage} from '../../core/services/storage';
import {catchError, throwError} from 'rxjs';
import {Router} from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(Storage);
  const router = inject(Router);
  const token = storageService.getToken();
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        storageService.clear();
        router.navigate(['/auth/login']);
      }
      return throwError(() => error);
    })
  );
};
