import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

import {ManageUserService} from '../manage-user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  layout = 'horizontal';
  AccountFormGroup: FormGroup;
  DetailFormGroup: FormGroup;
  roleSelected: string;
  private account = {};

  constructor(private manageUserService: ManageUserService, private formBuilder: FormBuilder, private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.AccountFormGroup = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      role: [null, [Validators.required]],
      email: [null],
      phone: [null]
    });
  }

  displayRoleFields(event) {
    if (event === 'DRIVER') {
      this.roleSelected = 'DRIVER';

      this.DetailFormGroup = this.formBuilder.group({
        driver_code: [null, Validators.required],
        driver_name: [null, Validators.required],
        driver_license: [null, Validators.required],
        driver_type: [null, Validators.required],
      });
    } else if (event === 'WORKSHOP') {
      this.roleSelected = 'WORKSHOP';

      this.DetailFormGroup = this.formBuilder.group({
        workshop_code: [null, Validators.required],
        workshop_location: [null, Validators.required],
        workshop_address: [null, Validators.required]
      });
    } else {
      this.roleSelected = 'ADMIN';
    }
  }

  submitForm() {
    const account = this.AccountFormGroup.value;
    console.log(account);

    for (const i in this.AccountFormGroup.controls) {
      if (this.AccountFormGroup.controls[i].status === 'INVALID') {
        this.AccountFormGroup.controls[i].markAsDirty();
        this.AccountFormGroup.controls[i].updateValueAndValidity();
      }
    }

    console.log('AccountFormGroup : ' + this.AccountFormGroup.valid);

    let detail = null;

    if (this.roleSelected === 'DRIVER' || this.roleSelected === 'WORKSHOP') {
      detail = this.DetailFormGroup.value;
      console.log(detail);

      for (const i in this.DetailFormGroup.controls) {
        if (this.DetailFormGroup.controls[i].status === 'INVALID') {
          this.DetailFormGroup.controls[i].markAsDirty();
          this.DetailFormGroup.controls[i].updateValueAndValidity();
        }
      }

      console.log('DetailFormGroup : ' + this.DetailFormGroup.valid);
    }

    if (this.AccountFormGroup.valid && this.DetailFormGroup.valid) {
      if (this.roleSelected === 'DRIVER') {
        this.account = {
          username: account.username,
          password: account.password,
          role: account.role,
          email: account.email,
          phone: account.phone,
          driver_code: detail.driver_code,
          driver_name: detail.driver_name,
          driver_license: detail.driver_license,
          driver_type: detail.driver_type
        };
      } else if (this.roleSelected === 'WORKSHOP') {
        this.account = {
          username: account.username,
          password: account.password,
          role: account.role,
          email: account.email,
          phone: account.phone,
          workshop_code: detail.workshop_code,
          workshop_name: detail.workshop_name,
          workshop_region: detail.workshop_region,
          workshop_address: detail.workshop_address
        };
      } else {
        this.account = {
          username: account.username,
          password: account.password,
          role: account.role,
          email: account.email,
          phone: account.phone
        };
      }

      this.manageUserService.RegisterNewUser(this.account)
        .pipe(first())
        .subscribe(response => {
          if (response === 'Success') {
            this.toast.success('Register Successfully');
          } else {
            this.toast.error('Error');
          }
        });
    }
  }

}
