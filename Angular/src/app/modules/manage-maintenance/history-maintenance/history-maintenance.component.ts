import {Component, OnInit} from '@angular/core';
import {ManageMaintenanceService} from '../manage-maintenance.service';
import {Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';

export interface MaintenanceDetailInterface {
  vehicle_code: string;
  vehicle_plate: string;
  vehicle_manufacturer: string;
  vehicle_model: string;
  workshop_name: string;
  completed_date: string;
  maintenance_description: string;
}

@Component({
  selector: 'app-history-maintenance',
  templateUrl: './history-maintenance.component.html',
  styleUrls: ['./history-maintenance.component.css']
})
export class HistoryMaintenanceComponent implements OnInit {
  TableLoading = true;
  MaintenanceHistoryList = [];
  private VehicleCodeList = [];
  VehicleCodeOptions = [];
  MaintenanceHistory: Subscription;
  SearchModalVisible = false;
  DetailModalVisible = false;
  VehicleCode: FormControl = new FormControl();
  SingleMaintenance: Subscription;
  MaintenanceDetail: MaintenanceDetailInterface;

  constructor(private manageMaintenanceService: ManageMaintenanceService) {
  }

  ngOnInit(): void {
    this.manageMaintenanceService.HistoryMaintenance();

    this.MaintenanceHistory = this.manageMaintenanceService.$HistoryMaintenance.subscribe(value => {
      // console.log(value);
      this.MaintenanceHistoryList = value;
      this.TableLoading = false;
      this.MaintenanceHistory.unsubscribe();
    });

    this.manageMaintenanceService.VehicleCodeList();

    this.manageMaintenanceService.$VehicleCodeList.subscribe(value => {
      // console.log(value);
      this.VehicleCodeList = value;
    });
  }

  onVehicleCodeAutoComplete(v: string) {
    this.VehicleCodeOptions = this.VehicleCodeList.filter(value => value.vehicle_code.toUpperCase().indexOf(v.toUpperCase()) === 0);
  }

  onVehicleSearch() {
    this.SearchModalVisible = true;
  }

  onVehicleSearchSubmit() {
    this.SearchModalVisible = false;
    this.manageMaintenanceService.SingleVehicleHistoryMaintenance(this.VehicleCode.value);
    this.VehicleCode.reset();
    this.TableLoading = true;

    this.MaintenanceHistory = this.manageMaintenanceService.$HistoryMaintenance.subscribe(value => {
      // console.log(value);
      this.MaintenanceHistoryList = value;
      this.TableLoading = false;
      this.MaintenanceHistory.unsubscribe();
    });
  }

  onDefaultList() {
    this.TableLoading = true;
    this.manageMaintenanceService.HistoryMaintenance();

    this.MaintenanceHistory = this.manageMaintenanceService.$HistoryMaintenance.subscribe(value => {
      // console.log(value);
      this.MaintenanceHistoryList = value;
      this.TableLoading = false;
      this.MaintenanceHistory.unsubscribe();
    });
  }

  onVehicleDetail(ID) {
    this.manageMaintenanceService.SingleMaintenance(ID);

    this.SingleMaintenance = this.manageMaintenanceService.$Maintenance.subscribe(value => {
      // console.log(value);
      this.MaintenanceDetail = value;
      console.log(this.MaintenanceDetail);
      this.DetailModalVisible = true;
    });
  }

  onModalCancel() {
    this.SearchModalVisible = false;
    this.DetailModalVisible = false;
  }

}
