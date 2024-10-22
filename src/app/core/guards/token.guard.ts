import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const tokenGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const check = sessionStorage.getItem("email");

  if (check) {
    return true;
  } else {
    router.navigate(['loginemail']);
    return false;
  }
};
