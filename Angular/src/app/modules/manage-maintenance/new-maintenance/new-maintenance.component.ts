import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManageMaintenanceService} from '../manage-maintenance.service';
import {ToastrService} from 'ngx-toastr';
import {first} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-maintenance',
  templateUrl: './new-maintenance.component.html',
  styleUrls: ['./new-maintenance.component.css']
})
export class NewMaintenanceComponent implements OnInit {
  MaintenanceFormGroup: FormGroup;
  private selection: Subscription;
  private workshopList = [];
  workshopOptions = [];
  private vehicleList = [];
  vehicleOptions = [];

  constructor(private manageMaintenanceService: ManageMaintenanceService, private formBuilder: FormBuilder, private toast: ToastrService) {

  }

  ngOnInit(): void {
    this.MaintenanceFormGroup = this.formBuilder.group({
      workshop: ['', Validators.required],
      vehicle: ['', Validators.required],
      date: ['', Validators.required]
    });

    this.manageMaintenanceService.AutoFieldOptions();

    this.selection = this.manageMaintenanceService.$SelectionSubject.subscribe(value => {
      this.vehicleList = value.vehicle;
      this.workshopList = value.workshop;
      this.selection.unsubscribe();
    });

  }

  onWorkshopAutoComplete(v: string) {
    this.workshopOptions = this.workshopList.filter(value => value.workshop_name.toUpperCase().indexOf(v.toUpperCase()) === 0);
  }

  onVehicleAutoComplete(v: string) {
    this.vehicleOptions = this.vehicleList.filter(value => value.vehicle_code.toUpperCase().indexOf(v.toUpperCase()) === 0);
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
