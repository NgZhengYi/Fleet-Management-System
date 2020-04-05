import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  constructor(private http: HttpClient) {
  }

  RegisterNewUser(account) {
    return this.http.post<{ message: string; error: string }>(
      environment.nodeUrl + '/account/RegisterNewUser', {account}
    ).pipe(map(response => {
      if (response.message === 'Success') {
        return response.message;
      } else {
        return response.error;
      }
    }));
  }
}
