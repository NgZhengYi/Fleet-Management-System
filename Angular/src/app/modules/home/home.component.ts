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

  ChartTypeDoughnut: ChartType = 'doughnut';
  chartDriverTypeLabel: Label;
  chartDriverTypeData: SingleDataSet;
  chartDriverTypeOptions: ChartOptions;
  chartTaskLabel: Label;
  chartTaskData: SingleDataSet;
  chartTaskOptions: ChartOptions;

  statisticAssignedVehicle: number;
  statisticUnassignedVehicle: number;
  statisticAvailableWorkshop: number;
  statisticTotalWorkshop: number;
  statisticScheduledMaintenance: number;
  statisticCompletedMaintenance: number;

  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.homeService.LoadDashboardData();

    this.$DashboardData = this.homeService.$Data.subscribe(value => {
      this.chartDriverTypeData = [
        parseInt(value.DriverType[0].a, 10),
        parseInt(value.DriverType[0].b, 10),
        parseInt(value.DriverType[0].c, 10),
        parseInt(value.DriverType[0].d, 10)
      ];

      this.chartTaskData = [
        parseInt(value.TaskStatus[0].ongoing, 10),
        parseInt(value.TaskStatus[0].upcoming, 10),
        parseInt(value.TaskStatus[0].unassigned, 10)
      ];

      this.statisticAssignedVehicle = parseInt(value.VehicleStatus[0].assigned_vehicle, 10);
      this.statisticUnassignedVehicle = parseInt(value.VehicleStatus[0].unassigned_vehicle, 10);
      this.statisticAvailableWorkshop = parseInt(value.WorkshopStatus[0].available_workshop, 10);
      this.statisticTotalWorkshop = parseInt(value.WorkshopStatus[0].total_workshop, 10);
      this.statisticScheduledMaintenance = parseInt(value.MaintenanceStatus[0].pending, 10);
      this.statisticCompletedMaintenance = parseInt(value.MaintenanceStatus[0].completed, 10);

      this.Loading = false;
      this.Ready = true;
      this.$DashboardData.unsubscribe();
    });

    this.chartDriverTypeLabel = ['A', 'B', 'C', 'D'];
    this.chartDriverTypeOptions = {
      title: {
        text: 'Driver Type',
        display: true,
        fontSize: 18
      }
    };

    this.chartTaskLabel = ['Ongoing', 'Upcoming', 'Unassigned'];
    this.chartTaskOptions = {
      title: {
        text: 'Task Status',
        display: true,
        fontSize: 18
      }
    };

  }

}
