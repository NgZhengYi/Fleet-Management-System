import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label, SingleDataSet} from 'ng2-charts';
import {Subscription} from 'rxjs';
import {ManageVehicleService} from './manage-vehicle.service';

@Component({
  selector: 'app-manage-vehicle',
  templateUrl: './manage-vehicle.component.html',
  styleUrls: ['./manage-vehicle.component.css']
})
export class ManageVehicleComponent implements OnInit {
  $DashboardData: Subscription;
  chartLoading = true;
  chartReady = false;

  chartVehicleStatusLabel: Label;
  chartVehicleStatusData: SingleDataSet;
  vehicleStatusChartType: ChartType;
  chartVehicleStatusOptions: ChartOptions;

  chartVehicleTypeLabel: Label;
  chartVehicleTypeData: SingleDataSet;
  vehicleTypeChartType: ChartType;
  chartVehicleTypeOptions: ChartOptions;

  constructor(private manageVehicleService: ManageVehicleService) {
  }

  ngOnInit(): void {
    this.manageVehicleService.LoadVehicleDashboard();

    this.$DashboardData = this.manageVehicleService.$DashboardSubject.subscribe(value => {
      this.chartVehicleStatusData = [
        parseInt(value.vehicle_status_available, 10),
        parseInt(value.vehicle_type_mission, 10),
        parseInt(value.vehicle_type_maintenance, 10)
      ];

      this.chartVehicleTypeData = [
        parseInt(value.vehicle_type_big, 10),
        parseInt(value.vehicle_type_medium, 10),
        parseInt(value.vehicle_type_small, 10)
      ];

      this.chartLoading = false;
      this.chartReady = true;
      this.$DashboardData.unsubscribe();
    });

    this.chartVehicleStatusLabel = ['Available', 'Operating', 'Maintenance'];
    // this.chartVehicleStatusData = [];
    this.vehicleStatusChartType = 'doughnut';
    this.chartVehicleStatusOptions = {
      title: {
        text: 'Vehicle Status',
        display: true,
        fontSize: 24
      }
    };

    this.chartVehicleTypeLabel = ['Big', 'Medium', 'Small'];
    // this.chartVehicleTypeData = [];
    this.vehicleTypeChartType = 'doughnut';
    this.chartVehicleTypeOptions = {
      title: {
        text: 'Vehicle Type',
        display: true,
        fontSize: 24
      }
    };

  }

}
