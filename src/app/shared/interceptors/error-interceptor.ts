import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import {Auth} from '../../core/services/auth';
import {Notification} from '../../core/services/notification';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const notificationService = inject(Notification);
  const authService = inject(Auth);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 401:
          authService.logout();
          notificationService.error('Session expirée, veuillez vous reconnecter.');
          break;
        case 403:
          notificationService.error('Accès refusé. Droits insuffisants.');
          router.navigate(['/dashboard']);
          break;
        case 404:
          notificationService.error('Ressource introuvable.');
          break;
        case 500:
          notificationService.error('Erreur serveur. Veuillez réessayer plus tard.');
          break;
        default:
          notificationService.error(error.error?.message ?? 'Une erreur est survenue.');
      }
      return throwError(() => error);
    })
  );
};
