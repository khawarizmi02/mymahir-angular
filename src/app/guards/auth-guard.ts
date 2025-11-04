import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthApiService } from '../services/auth-api.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authApiService = inject(AuthApiService);
  const router = inject(Router);

  let token = authApiService.getToken();

  if (token) return true;

  router.navigate(['/login']);
  return true;
};
