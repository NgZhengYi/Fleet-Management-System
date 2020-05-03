import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {
  $DriverSubject: Subject<any> = new Subject<any>();
  $WorkshopSubject: Subject<any> = new Subject<any>();
  $SingleDriver: Subject<any> = new Subject<any>();
  $SingleWorkshop: Subject<any> = new Subject<any>();
  $SelectVehicle: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  RegisterNewUser(account) {
    return this.http.post<{ message: string; error: string }>(
      environment.nodeUrl + '/account/RegisterNewUser', {account}
    ).pipe(map(response => {
      if (response.message === 'Success') {
        return response.message;
      } else {
        console.log(response.error);
        return response.message;
      }
    }));
  }

  LoadDriverList() {
    this.http.get<{ message: string; result: any }>(
      environment.nodeUrl + '/driver/LoadDriver'
    ).subscribe(async response => {
      if (response.message === 'Success') {
        this.$DriverSubject.next(response.result);
      }
    });
  }

  LoadWorkshopList() {
    this.http.get<{ message: string; result: any }>(
      environment.nodeUrl + '/account/LoadWorkshop'
    ).subscribe(async response => {
      if (response.message === 'Success') {
        this.$WorkshopSubject.next(response.result);
      }
    });
  }

  SingleDriver(ID) {
    this.http.post<{ message: string; result: any }>(
      environment.nodeUrl + '/driver/SingleDriver', {ID}
    ).subscribe(async response => {
      if (response.message === 'Success') {
        this.$SingleDriver.next(response.result);
      }
    });
  }

  FetchSingleWorkshop(ID) {
    this.http.post<{ message: string; result: any }>(
      environment.nodeUrl + '/account/FetchSingleWorkshop', {ID}
    ).subscribe(async response => {
      if (response.message === 'Success') {
        this.$SingleWorkshop.next(response.result);
      }
    });
  }

  UpdateDriver(DETAIL) {
    return this.http.post<{ message: string; error: string }>(
      environment.nodeUrl + '/driver/UpdateDriver', {DETAIL}
    ).pipe(map(response => {
      if (response.message === 'Success') {
        return response.message;
      } else {
        console.log(response.error);
        return response.message;
      }
    }));
  }

  UpdateWorkshop(DETAIL) {
    return this.http.post<{ message: string; error: string }>(
      environment.nodeUrl + '/account/UpdateWorkshop', {DETAIL}
    ).pipe(map(response => {
      if (response.message === 'Success') {
        return response.message;
      } else {
        console.log(response.error);
        return response.message;
      }
    }));
  }

  SelectVehicle() {
    this.http.get<{message: string; result: any}>(
      environment.nodeUrl + '/driver/SelectVehicle'
    ).subscribe(async response => {
      if (response.message === 'Success') {
        this.$SelectVehicle.next(response.result);
      }
    });
  }

}
