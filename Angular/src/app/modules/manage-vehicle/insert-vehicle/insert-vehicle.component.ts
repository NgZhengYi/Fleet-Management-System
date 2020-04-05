import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

import {ManageVehicleService} from '../manage-vehicle.service';

@Component({
  selector: 'app-insert-vehicle',
  templateUrl: './insert-vehicle.component.html',
  styleUrls: ['./insert-vehicle.component.css']
})
export class InsertVehicleComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private manageVehicleService: ManageVehicleService, private formBuilder: FormBuilder,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      vehicle_code: [null, [Validators.required]],
      vehicle_name: [null, [Validators.required]],
      vehicle_plate: [null, [Validators.required]],
      vehicle_type: [null, [Validators.required]]
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
      this.manageVehicleService.InsertNewVehicle(this.formGroup.value)
        .pipe(first())
        .subscribe(response => {
          if (response === 'Success') {
            this.toast.success('New Vehicle Inserted Successfully');
            this.formGroup.reset();
          } else {
            this.toast.error(response);
          }
        });
    }
  }

}
