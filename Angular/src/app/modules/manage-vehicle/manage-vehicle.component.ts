import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ManageVehicleService} from './manage-vehicle.service';

@Component({
  selector: 'app-manage-vehicle',
  templateUrl: './manage-vehicle.component.html',
  styleUrls: ['./manage-vehicle.component.css']
})
export class ManageVehicleComponent implements OnInit {
  loading = true;
  dataSet = [];
  $vehicle: Subscription;

  constructor(private manageVehicleService: ManageVehicleService) {
  }

  ngOnInit(): void {
    this.manageVehicleService.LoadVehicleData();

    this.$vehicle = this.manageVehicleService.$VehicleSubject.subscribe(value => {
      // console.log(value);
      this.dataSet = value;
      this.loading = false;
      this.$vehicle.unsubscribe();
    });
  }

}
