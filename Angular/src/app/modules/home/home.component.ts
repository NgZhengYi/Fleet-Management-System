import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Label, SingleDataSet} from 'ng2-charts';
import {ChartOptions, ChartType} from 'chart.js';

import {HomeService} from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  $DashboardData: Subscription;
  Loading = true;
  Ready = false;

  chartVehicleStatusLabel: Label;
  chartVehicleStatusData: SingleDataSet;
  vehicleStatusChartType: ChartType;
  chartVehicleStatusOptions: ChartOptions;

  chartVehicleTypeLabel: Label;
  chartVehicleTypeData: SingleDataSet;
  vehicleTypeChartType: ChartType;
  chartVehicleTypeOptions: ChartOptions;

  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.homeService.LoadDashboardData();

    this.$DashboardData = this.homeService.$DashboardData.subscribe(value => {
      this.chartVehicleStatusData = [
        parseInt(value.vehicle_status_available, 10),
        parseInt(value.vehicle_status_assigned, 10),
        parseInt(value.vehicle_status_maintenance, 10)
      ];

      this.chartVehicleTypeData = [
        parseInt(value.vehicle_type_big, 10),
        parseInt(value.vehicle_type_medium, 10),
        parseInt(value.vehicle_type_small, 10)
      ];

      this.Loading = false;
      this.Ready = true;
      this.$DashboardData.unsubscribe();
    });

    this.chartVehicleStatusLabel = ['AVAILABLE', 'ASSIGNED', 'MAINTENANCE'];
    this.vehicleStatusChartType = 'doughnut';
    this.chartVehicleStatusOptions = {
      title: {
        text: 'Vehicle Status',
        display: true,
        fontSize: 18
      }
    };

    this.chartVehicleTypeLabel = ['BIG', 'MEDIUM', 'SMALL'];
    this.vehicleTypeChartType = 'doughnut';
    this.chartVehicleTypeOptions = {
      title: {
        text: 'Vehicle Type',
        display: true,
        fontSize: 18
      }
    };
  }

}
