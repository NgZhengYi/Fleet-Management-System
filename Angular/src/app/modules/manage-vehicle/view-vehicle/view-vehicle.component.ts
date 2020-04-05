import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {ManageVehicleService} from '../manage-vehicle.service';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  loading = true;
  dataSet = [];
  $vehicle: Subscription;

  constructor(private manageVehicleService: ManageVehicleService) {
  }

  ngOnInit(): void {
    this.manageVehicleService.LoadVehicleData();

    this.$vehicle = this.manageVehicleService.$VehicleSubject.subscribe(value => {
      this.dataSet = value;
      this.loading = false;
      this.$vehicle.unsubscribe();
    });
  }
}
