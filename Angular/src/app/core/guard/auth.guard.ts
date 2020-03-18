import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AuthService} from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (route.data) {
      console.log(route.data);
    }

    return this.authService.tokenVerification()
      .pipe(map(value => {
        if (value === 'True') {
          return true;
        } else {
          this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
          return false;
        }
      }));
  }
}
