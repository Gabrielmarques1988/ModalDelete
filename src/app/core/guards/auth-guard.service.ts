import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const AuthGuardService: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const jwtHelper = inject(JwtHelperService);

  const token = sessionStorage.getItem('jwt');
  if(token && !jwtHelper.isTokenExpired(token)){
    return true;
  }

  router.navigate(['loginemail']);
  return false;
};
