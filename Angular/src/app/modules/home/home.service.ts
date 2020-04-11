import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  $DashboardData: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  LoadDashboardData() {
    this.http.post<{ message: string; result: any }>(
      environment.nodeUrl + '/vehicle/LoadDashboardData', {}
    ).subscribe(async response => {
      if (response.message === 'Success') {
        this.$DashboardData.next(response.result);
      }
    });
  }


}
