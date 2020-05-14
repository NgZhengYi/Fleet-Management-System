import {Component, OnInit} from '@angular/core';
import {ManageMaintenanceService} from './manage-maintenance.service';

@Component({
  selector: 'app-manage-maintenance',
  templateUrl: './manage-maintenance.component.html',
  styleUrls: ['./manage-maintenance.component.css']
})
export class ManageMaintenanceComponent implements OnInit {
  scheduledMaintenance: [];
  completedMaintenance: [];

  constructor(private manageMaintenanceService: ManageMaintenanceService) {
  }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad() {
    this.manageMaintenanceService.MaintenanceList();

    this.manageMaintenanceService.$MaintenanceList.subscribe(value => {
      console.log(value);
      this.scheduledMaintenance = value.scheduledMaintenance;
      this.completedMaintenance = value.completedMaintenance;
    });
  }

}
