import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Storage} from '../services/storage';

export const authGuard: CanActivateFn = (route, state) => {
  const storageService = inject(Storage);
  const router = inject(Router);

  if (storageService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
