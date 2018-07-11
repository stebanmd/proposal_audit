import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('BearerTokenKey') != null) {
      return true;
    }
    else {
      this.router.navigate(['login']);
      return false;
    }
  }

}


