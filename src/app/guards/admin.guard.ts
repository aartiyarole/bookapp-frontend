import { CanActivateFn ,Router} from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const user = JSON.parse(sessionStorage.getItem('BookUser'));
  if(user && user.isAdmin){
    return true;
  }else{
    const router = inject(Router)
    return router.navigate(['home']);
  }
};
