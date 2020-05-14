import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

import {ManageUserService} from '../manage-user.service';

@Component({
  selector: 'app-workshop-detail',
  templateUrl: './workshop-detail.component.html',
  styleUrls: ['./workshop-detail.component.css']
})
export class WorkshopDetailComponent implements OnInit {
  WorkshopFormGroup: FormGroup;
  loading = true;
  FormReady = false;
  private WorkshopIdentity;
  private WorkshopDetail: Subscription;

  constructor(private manageUserService: ManageUserService, private formBuilder: FormBuilder, private route: ActivatedRoute,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(value => {
      this.WorkshopIdentity = value.AUTO_IDENTITY;
    });

    this.manageUserService.FetchSingleWorkshop(this.WorkshopIdentity);

    this.WorkshopDetail = this.manageUserService.$SingleWorkshop.subscribe(value => {
      // console.log(value);
      this.WorkshopFormGroup = this.formBuilder.group({
        workshop_identity: [this.WorkshopIdentity],
        workshop_code: [value.workshop_code, Validators.required],
        workshop_name: [value.workshop_name, Validators.required],
        workshop_region: [value.workshop_region],
        workshop_address: [value.workshop_address, Validators.required],
        workshop_status: [value.workshop_status]
      });

      this.loading = false;
      this.FormReady = true;
      this.WorkshopDetail.unsubscribe();
    });
  }

  updateForm() {
    console.log(this.WorkshopFormGroup.value);

    for (const i in this.WorkshopFormGroup.controls) {
      if (this.WorkshopFormGroup.controls[i].status === 'INVALID') {
        this.WorkshopFormGroup.controls[i].markAsDirty();
        this.WorkshopFormGroup.controls[i].updateValueAndValidity();
      }
    }

    if (this.WorkshopFormGroup.valid) {
      this.manageUserService.UpdateWorkshop(this.WorkshopFormGroup.value)
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
