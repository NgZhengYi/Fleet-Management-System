import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageMaintenanceService {
  $MaintenanceList: Subject<any> = new Subject<any>();
  $Workshop: Subject<any> = new Subject<any>();
  $Vehicle: Subject<any> = new Subject<any>();
  $Maintenance: Subject<any> = new Subject<any>();
  $HistoryMaintenance: Subject<any> = new Subject<any>();
  $VehicleCodeList: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  MaintenanceList() {
    this.http.get<{ message: string; scheduled: any; completed: any }>(
      environment.nodeUrl + '/maintenance/MaintenanceList'
    ).subscribe(async response => {
      if (response.message === 'Success') {
        const maintenanceList = {scheduledMaintenance: response.scheduled, completedMaintenance: response.completed};
        this.$MaintenanceList.next(maintenanceList);
      }
    });
  }

  NewMaintenance(maintenance) {
    return this.http.post<{ message: string }>(
      environment.nodeUrl + '/maintenance/New-Maintenance', {maintenance}
    ).pipe(map(response => {
      if (response.message === 'Success') {
        return response.message;
      } else {
        return response.message;
      }
    }));
  }

  UpdateMaintenance(maintenance) {
    return this.http.post<{ message: string }>(
      environment.nodeUrl + '/maintenance/Update-Maintenance', {maintenance}
    ).pipe(map(response => {
      if (response.message === 'Success') {
        return 'Success';
      } else {
        return response.message;
      }
    }));
  }

  SelectWorkshop() {
    this.http.get<{ message: string; result: any }>(
      environment.nodeUrl + '/maintenance/SelectWorkshop'
    ).subscribe(async response => {
      if (response.message === 'Success') {
        this.$Workshop.next(response.result);
      }
    });
  }

  SelectVehicle() {
    this.http.get<{ message: string; result: any }>(
      environment.nodeUrl + '/maintenance/SelectVehicle'
    ).subscribe(async response => {
      if (response.message === 'Success') {
        this.$Vehicle.next(response.result);
      }
    });
  }

  SingleMaintenance(ID) {
    this.http.post<{ message: string; result: any }>(
      environment.nodeUrl + '/maintenance/SingleMaintenance', {ID}
    ).subscribe(async response => {
      if (response.message === 'Success') {
        this.$Maintenance.next(response.result);
      }
    });
  }

  HistoryMaintenance() {
    this.http.get<{ message: string; result: any }>(
      environment.nodeUrl + '/maintenance/History-Maintenance'
    ).subscribe(async response => {
      if (response.message === 'Success') {
        this.$HistoryMaintenance.next(response.result);
      }
    });
  }

  SingleVehicleHistoryMaintenance(CODE) {
    this.http.post<{ message: string; result: any }>(
      environment.nodeUrl + '/maintenance/Single-Vehicle-History-Maintenance', {CODE}
    ).subscribe(async response => {
      if (response.message === 'Success') {
        this.$HistoryMaintenance.next(response.result);
      }
    });
  }

  VehicleCodeList() {
    this.http.get<{ message: string; result: any }>(
      environment.nodeUrl + '/maintenance/Vehicle-Code-List'
    ).subscribe(async response => {
      if (response.message === 'Success') {
        this.$VehicleCodeList.next(response.result);
      }
    });
  }

}
