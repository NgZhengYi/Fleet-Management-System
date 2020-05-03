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
  ListVehicle = [];
  ModalVisible = false;
  LoadingVehicle = true;

  constructor(private manageUserService: ManageUserService, private formBuilder: FormBuilder, private route: ActivatedRoute,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(value => {
      this.DriverIdentity = value.AUTO_IDENTITY;
    });

    this.manageUserService.SingleDriver(this.DriverIdentity);

    this.DriverDetail = this.manageUserService.$SingleDriver.subscribe(value => {
      console.log(value);
      this.DriverDetailFormGroup = this.formBuilder.group({
        driver_identity: [this.DriverIdentity],
        driver_code: [value.driver_code, Validators.required],
        driver_name: [value.driver_name, Validators.required],
        driver_license: [value.driver_license, Validators.required],
        driver_type: [value.driver_type, Validators.required],
        driver_status: [value.driver_status],
        vehicle_code: [value.vehicle_code],
        vehicle_identity: [value.vehicle_identity]
      });

      this.loading = false;
      this.FormReady = true;
      this.DriverDetail.unsubscribe();
    });

  }

  selectVehicle() {
    this.ModalVisible = true;
    this.manageUserService.SelectVehicle();

    this.manageUserService.$SelectVehicle.subscribe(value => {
      this.ListVehicle = value;
      this.LoadingVehicle = false;
    });
  }

  onVehicleSelected(ID, CODE) {
    this.ModalVisible = false;

    this.DriverDetailFormGroup.patchValue({
      vehicle_code: CODE,
      vehicle_identity: ID
    });
  }

  onModalCancel() {
    this.ModalVisible = false;
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
      this.manageUserService.UpdateDriver(this.DriverDetailFormGroup.value)
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
