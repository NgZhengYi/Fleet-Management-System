import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  $Data: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  LoadDashboardData() {
    this.http.get<{ message: string; result: any }>(
      environment.nodeUrl + '/home/HomeData'
    ).subscribe(async response => {
      if (response.message === 'Success') {
        this.$Data.next(response.result);
      }
    });
  }


}
