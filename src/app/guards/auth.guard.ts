import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if(sessionStorage.getItem('BookUser')){
    return true;
  }else{
    const router = inject(Router)
    return router.navigate(['home']);
  }
};
//we use return because authguard only accept boolean or url tree 