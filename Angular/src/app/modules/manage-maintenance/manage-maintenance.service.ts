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
  $SelectionSubject: Subject<any> = new Subject<any>();

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
      environment.nodeUrl + '/maintenance/UpdateMaintenance', {maintenance}
    ).pipe(map(response => {
      if (response.message === 'Success') {
        return 'Success';
      } else {
        return response.message;
      }
    }));
  }

  AutoFieldOptions() {
    this.http.get<{ message: string; workshop: any; vehicle: any }>(
      environment.nodeUrl + '/maintenance/MaintenanceAutoField'
    ).subscribe(async response => {
      if (response.message === 'Success') {
        const content = {workshop: response.workshop, vehicle: response.vehicle};
        this.$SelectionSubject.next(content);
      }
    });

  }

}
