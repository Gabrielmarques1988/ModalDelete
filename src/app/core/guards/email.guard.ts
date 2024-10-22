import { CanActivateFn, Router } from '@angular/router';

export const emailGuard: CanActivateFn = (route, state) => {
  if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
    const check = sessionStorage.getItem("email");
    const router = new Router();
    if (check) {
      router.navigate(['logintoken']);
      return false;
    }
    return true;
  } else {
    return false;
  }
};
