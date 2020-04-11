import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {ManageVehicleService} from '../manage-vehicle.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent implements OnInit {
  layout = 'horizontal';
  formGroup: FormGroup;
  private ID;
  private CODE;
  private NAME;
  private PLATE;
  private TYPE;
  private STATUS;

  constructor(private manageVehicleService: ManageVehicleService, private formBuilder: FormBuilder,
              private toast: ToastrService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      this.ID = value.ID;
    });

    this.route.queryParams.subscribe(value => {
      this.CODE = value.CODE;
      this.NAME = value.NAME;
      this.PLATE = value.PLATE;
      this.TYPE = value.TYPE;
      this.STATUS = value.STATUS;
    });

    this.formGroup = this.formBuilder.group({
      vehicle_code: [this.CODE, [Validators.required]],
      vehicle_name: [this.NAME, [Validators.required]],
      vehicle_plate: [this.PLATE, [Validators.required]],
      vehicle_type: [this.TYPE],
      vehicle_status: [this.STATUS]
    });
  }

  submitForm() {
    console.log(this.formGroup.value);

    for (const i in this.formGroup.controls) {
      if (this.formGroup.controls[i].status === 'INVALID') {
        this.formGroup.controls[i].markAsDirty();
        this.formGroup.controls[i].updateValueAndValidity();
      }
    }

    if (this.formGroup.valid) {
      this.manageVehicleService.UpdateVehicle(this.formGroup.value)
        .pipe(first())
        .subscribe(response => {
          if (response === 'Success') {
            this.toast.success('Updated Vehicle Successfully');
            this.formGroup.reset();
          } else {
            this.toast.error(response);
          }
        });
    }
  }

}
