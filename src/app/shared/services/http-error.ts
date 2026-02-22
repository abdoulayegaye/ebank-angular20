import {inject, Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Auth} from '../../core/services/auth';
import {Router} from '@angular/router';
import {Notification} from '../../core/services/notification';

@Injectable({
  providedIn: 'root',
})
export class HttpError {

  authService = inject(Auth)
  notificationService = inject(Notification)
  router = inject(Router);

  handleError(err: HttpErrorResponse): void {

    let message = 'Une erreur est survenue.';

    switch (err.status) {
      case 0:
        message = 'Impossible de contacter le serveur. Vérifiez votre connexion.';
        break;
      case 400:
        message = err.error?.message ?? 'Requête invalide.';
        break;
      case 401:
        message = 'Session expirée. Veuillez vous reconnecter.';
        this.authService.logout();
        this.router.navigate(['/auth/login']);
        break;
      case 403:
        message = 'Accès refusé. Droits insuffisants.';
        this.router.navigate(['/home']);
        break;
      case 404:
        message = 'Ressource introuvable.';
        break;
      case 409:
        message = err.error?.message ?? 'CONFLICT';
        break;
      case 500:
        message = 'Erreur serveur. Réessayez plus tard.';
        break;
      default:
        message = err.error?.message ?? `Erreur inattendue (${err.status}).`;
    }

    console.error(`[${err.status}] ${err.url}`, err.error);
    this.notificationService.error(message);
    throw new Error(message);
  }
}
