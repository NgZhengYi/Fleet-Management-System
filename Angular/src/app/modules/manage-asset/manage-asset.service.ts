import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable()
export class ManageAssetService {
  $FleetSubject: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  LoadFleetData() {
    this.http.post<{result: any}>(
      'http://localhost:3000/api/fleet/LoadFleetData',
      {}
    ).subscribe(async response => {
      // console.log(response.result);
      this.$FleetSubject.next(response.result);
    });
  }

}
