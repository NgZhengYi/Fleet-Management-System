import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $authStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private http: HttpClient) {
  }

  login(username, password) {
    return this.http.post<{ message: string; result: any }>(
      environment.nodeUrl + '/account/ValidateLogin', {username, password}
    ).pipe(map(value => {
        if (value.message === 'Success') {
          localStorage.setItem('Fleet Management System', JSON.stringify(value.result));
          this.$authStatus.next(true);
        }
        console.log('Error');
        return value.message;
      })
    );
  }

  logout() {
    localStorage.removeItem('Fleet Management System');
    this.$authStatus.next(false);
    this.router.navigate(['/']);
  }

  tokenVerification() {
    const storage = JSON.parse(localStorage.getItem('Fleet Management System'));

    if (!storage) {
      console.log('Local Storage Not Found !!!');
      this.$authStatus.next(false);
      return of('False');
    } else {
      const token = storage.token;
      // console.log(token);

      return this.http.post<{ message: string }>(
        environment.nodeUrl + '/account/ValidateToken', {token}
      ).pipe(map(value => {
        if (value.message === 'True') {
          this.$authStatus.next(true);
        } else {
          this.$authStatus.next(false);
        }
        return value.message;
      }));
    }
  }

  get authStatus() {
    return this.$authStatus.asObservable();
  }

}
