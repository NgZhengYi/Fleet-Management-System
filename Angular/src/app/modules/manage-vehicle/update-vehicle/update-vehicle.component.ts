import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {ManageVehicleService} from '../manage-vehicle.service';
import {first} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent implements OnInit {
  layout = 'vertical';
  VehicleFormGroup: FormGroup;
  Loading = true;
  FormReady = false;
  private VehicleIdentity: number;
  private VehicleDetail: Subscription;

  constructor(private manageVehicleService: ManageVehicleService, private formBuilder: FormBuilder,
              private toast: ToastrService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(value => {
      console.log(value);
      this.VehicleIdentity = value.AUTO_IDENTITY;
    });

    this.manageVehicleService.SingleVehicle(this.VehicleIdentity);

    this.VehicleDetail = this.manageVehicleService.$SingleVehicleSubject.subscribe(value => {
      console.log(value);
      this.VehicleFormGroup = this.formBuilder.group({
        auto_identity: [this.VehicleIdentity],
        vehicle_code: [value.vehicle_code, [Validators.required]],
        vehicle_type: [value.vehicle_type, [Validators.required]],
        vehicle_manufacturer: [value.vehicle_manufacturer, [Validators.required]],
        vehicle_model: [value.vehicle_model, [Validators.required]],
        vehicle_year: [value.vehicle_year, [
          Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(4), Validators.maxLength(4)
        ]],
        vehicle_max_load: [value.vehicle_max_load, [Validators.required, Validators.pattern('^[0-9]*$')]],
        vehicle_plate: [value.vehicle_plate, [Validators.required]],
        vehicle_status: [value.vehicle_status, [Validators.required]],
        vehicle_last_maintenance: [null ? '' : value.vehicle_last_maintenance]
      });

      this.Loading = false;
      this.FormReady = true;
      this.VehicleDetail.unsubscribe();
    });
  }

  submitForm() {
    console.log(this.VehicleFormGroup.value);

    for (const i in this.VehicleFormGroup.controls) {
      if (this.VehicleFormGroup.controls[i].status === 'INVALID') {
        this.VehicleFormGroup.controls[i].markAsDirty();
        this.VehicleFormGroup.controls[i].updateValueAndValidity();
      }
    }

    if (this.VehicleFormGroup.valid) {
      this.manageVehicleService.UpdateVehicle(this.VehicleFormGroup.value)
        .pipe(first())
        .subscribe(response => {
          if (response === 'Success') {
            this.toast.success('Updated Vehicle Successfully');
          } else {
            this.toast.error(response);
          }
        });
    }
  }

}
