import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageVehicleService {
  $VehicleSubject: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  LoadVehicleData() {
    this.http.get<{ message: string; result: any }>(
      'http://localhost:3000/api/vehicle/LoadVehicleData'
    ).subscribe(async response => {
      if (response.message === 'Success') {
        this.$VehicleSubject.next(response.result);
      }
    });
  }

  InsertVehicle(vehicle) {
    return this.http.post<{ message: string; error: string }>(
      environment.nodeUrl + '/vehicle/InsertVehicle', {vehicle}
    ).pipe(map(response => {
      if (response.message === 'Success') {
        return response.message;
      } else {
        return response.error;
      }
    }));
  }

  UpdateVehicle(vehicle) {
    return this.http.post<{ message: string; error: string }>(
      environment.nodeUrl + '/vehicle/UpdateVehicle', {vehicle}
    ).pipe(map(response => {
      if (response.message === 'Success') {
        return response.message;
      } else {
        return response.error;
      }
    }));
  }

}
