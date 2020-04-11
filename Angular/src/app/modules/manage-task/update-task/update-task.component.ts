import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

import {ManageTaskService} from '../manage-task.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  TaskFormGroup: FormGroup;
  private TaskDetail: Subscription;
  private SelectDriver: Subscription;
  loading = true;
  FormReady = false;
  private TaskIdentity;
  private DriverList = [];
  options = [];

  constructor(private manageTaskService: ManageTaskService, private formBuilder: FormBuilder, private toast: ToastrService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(value => {
      this.TaskIdentity = value.AUTO_IDENTITY;
    });

    this.manageTaskService.SingleTask(this.TaskIdentity);

    this.TaskDetail = this.manageTaskService.$SingleTask.subscribe(value => {
      // console.log(value);
      this.TaskFormGroup = this.formBuilder.group({
        task_title: [value.task_title, Validators.required],
        task_detail: [value.task_detail],
        task_date: [value.task_date.slice(0, 10), Validators.required],
        task_time: [value.task_time, Validators.required],
        task_origin_location: [value.task_origin_location, Validators.required],
        task_destination_location: [value.task_destination_location, Validators.required],
        task_driver: [value.task_driver],
        task_vehicle: [value.task_vehicle]
      });

      this.loading = false;
      this.FormReady = true;
      this.TaskDetail.unsubscribe();
    });

    this.manageTaskService.SelectDriver();

    this.SelectDriver = this.manageTaskService.$SelectDriver.subscribe(value => {
      this.DriverList = value;
      this.SelectDriver.unsubscribe();
    });
  }

  onAutoCompleteInput(v: string) {
    this.options = this.DriverList.filter(value => value.driver_code.toUpperCase().indexOf(v.toUpperCase()) === 0);
  }

  updateForm() {
    console.log(this.TaskFormGroup.value);

    for (const i in this.TaskFormGroup.controls) {
      if (this.TaskFormGroup.controls[i].status === 'INVALID') {
        this.TaskFormGroup.controls[i].markAsDirty();
        this.TaskFormGroup.controls[i].updateValueAndValidity();
      }
    }

    if (this.TaskFormGroup.valid) {
      this.manageTaskService.UpdateTask(this.TaskFormGroup.value)
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
