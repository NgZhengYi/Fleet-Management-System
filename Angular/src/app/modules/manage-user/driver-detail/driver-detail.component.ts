import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

import {ManageUserService} from '../manage-user.service';

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.css']
})
export class DriverDetailComponent implements OnInit {
  DriverDetailFormGroup: FormGroup;
  loading = true;
  FormReady = false;
  private DriverIdentity;
  private DriverDetail: Subscription;
  private SelectVehicle: Subscription;
  private VehicleList = [];
  options = [];

  constructor(private manageUserService: ManageUserService, private formBuilder: FormBuilder, private route: ActivatedRoute,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(value => {
      this.DriverIdentity = value.AUTO_IDENTITY;
    });

    this.manageUserService.FetchSingleDriver(this.DriverIdentity);

    this.DriverDetail = this.manageUserService.$SingleDriver.subscribe(value => {
      console.log(value);
      this.DriverDetailFormGroup = this.formBuilder.group({
        driver_identity: [this.DriverIdentity],
        driver_code: [value.driver_code, Validators.required],
        driver_name: [value.driver_name, Validators.required],
        driver_license: [value.driver_license, Validators.required],
        driver_skill_level: [value.driver_skill_level, Validators.required],
        driver_status: [value.driver_status],
        driver_vehicle: [null ? '' : value.vehicle_code]
      });

      this.loading = false;
      this.FormReady = true;
      this.DriverDetail.unsubscribe();
    });

    this.manageUserService.SelectVehicle();

    this.SelectVehicle = this.manageUserService.$SelectVehicle.subscribe(value => {
      this.VehicleList = value;
      this.SelectVehicle.unsubscribe();
    });
  }

  onAutoCompleteInput(v: string) {
    this.options = this.VehicleList.filter(value => value.vehicle_code.toUpperCase().indexOf(v.toUpperCase()) === 0);
  }

  updateForm() {
    console.log(this.DriverDetailFormGroup.value);

    for (const i in this.DriverDetailFormGroup.controls) {
      if (this.DriverDetailFormGroup.controls[i].status === 'INVALID') {
        this.DriverDetailFormGroup.controls[i].markAsDirty();
        this.DriverDetailFormGroup.controls[i].updateValueAndValidity();
      }
    }

    if (this.DriverDetailFormGroup.valid) {
      this.manageUserService.UpdateSingleWorkshop(this.DriverDetailFormGroup.value)
        .pipe(first())
        .subscribe(response => {
          if (response === 'Success') {
            this.toast.success('Update Successfully');
          } else {
            this.toast.error('Error');
          }
        });
    }
  }

}
