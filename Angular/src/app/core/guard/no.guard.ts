import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AuthService} from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.tokenVerification()
      .pipe(map(value => {
        if (value === 'True') {
          console.log('You had Login, Redirect to Home Page');
          this.router.navigate(['/home']);
          return false;
        } else {
          return true;
        }
      }));
  }

}
