import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManageMaintenanceService} from '../manage-maintenance.service';
import {ToastrService} from 'ngx-toastr';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-new-maintenance',
  templateUrl: './new-maintenance.component.html',
  styleUrls: ['./new-maintenance.component.css']
})
export class NewMaintenanceComponent implements OnInit {
  MaintenanceFormGroup: FormGroup;
  WorkshopModalVisible = false;
  VehicleModalVisible = false;
  LoadingWorkshop = true;
  LoadingVehicle = true;
  WorkshopList = [];
  VehicleList = [];

  constructor(private manageMaintenanceService: ManageMaintenanceService, private formBuilder: FormBuilder, private toast: ToastrService) {

  }

  ngOnInit(): void {
    this.MaintenanceFormGroup = this.formBuilder.group({
      workshop_identity: ['', Validators.required],
      workshop_name: ['', Validators.required],
      vehicle_identity: ['', Validators.required],
      vehicle_code: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  onSelectWorkshop() {
    this.WorkshopModalVisible = true;
    this.manageMaintenanceService.SelectWorkshop();

    this.manageMaintenanceService.$Workshop.subscribe(value => {
      console.log(value);
      this.WorkshopList = value;
      this.LoadingWorkshop = false;
    });
  }

  onSelectVehicle() {
    this.VehicleModalVisible = true;
    this.manageMaintenanceService.SelectVehicle();

    this.manageMaintenanceService.$Vehicle.subscribe(value => {
      console.log(value);
      this.VehicleList = value;
      this.LoadingVehicle = false;
    });
  }

  onWorkshopSelected(ID, NAME) {
    this.WorkshopModalVisible = false;

    this.MaintenanceFormGroup.patchValue({
      workshop_identity: ID,
      workshop_name: NAME
    });
  }

  onVehicleSelected(ID, CODE) {
    this.VehicleModalVisible = false;

    this.MaintenanceFormGroup.patchValue({
      vehicle_identity: ID,
      vehicle_code: CODE
    });
  }

  onWorkshopModalCancel() {
    this.WorkshopModalVisible = false;
  }

  onVehicleModalCancel() {
    this.VehicleModalVisible = false;
  }

  submitForm() {
    console.log(this.MaintenanceFormGroup.value);

    for (const i in this.MaintenanceFormGroup.controls) {
      if (this.MaintenanceFormGroup.controls[i].status === 'INVALID') {
        this.MaintenanceFormGroup.controls[i].markAsDirty();
        this.MaintenanceFormGroup.controls[i].updateValueAndValidity();
      }
    }

    if (this.MaintenanceFormGroup.valid) {
      this.manageMaintenanceService.NewMaintenance(this.MaintenanceFormGroup.value)
        .pipe(first())
        .subscribe(response => {
          if (response === 'Success') {
            this.toast.success('Added Successfully');
          } else {
            this.toast.error('Duplicated');
          }
        });
    }
  }

}
