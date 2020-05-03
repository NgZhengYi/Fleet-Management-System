import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {NzModalService} from 'ng-zorro-antd';

import {ManageTaskService} from '../manage-task.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  private storage = JSON.parse(localStorage.getItem('Fleet Management System'));
  layout = 'vertical';
  TaskFormGroup: FormGroup;
  private TaskDetail: Subscription;
  loading = true;
  FormReady = false;
  private TaskIdentity;
  ReturnURL;
  ModalVisible = false;
  LoadingDriver = true;
  ListDriver = [];

  constructor(private manageTaskService: ManageTaskService, private formBuilder: FormBuilder, private toast: ToastrService,
              private activatedRoute: ActivatedRoute, private modal: NzModalService) {
  }

  ngOnInit(): void {
    this.TaskIdentity = this.activatedRoute.snapshot.queryParams.AUTO_IDENTITY;
    this.ReturnURL = this.activatedRoute.snapshot.queryParams.RETURN || '';

    this.manageTaskService.SingleTask(this.TaskIdentity);

    this.TaskDetail = this.manageTaskService.$SingleTask.subscribe(value => {
      // console.log(value);
      this.TaskFormGroup = this.formBuilder.group({
        auto_identity: [this.TaskIdentity],
        task_title: [value.task_title, Validators.required],
        task_driver: [null ? null : value.driver_name],
        driver_identity: [null ? null : value.driver_identity],
        task_date_start: [value.task_date_start.slice(0, 10), Validators.required],
        task_date_end: [value.task_date_end.slice(0, 10), Validators.required],
        task_time_start: [value.task_time_start],
        task_time_end: [value.task_time_end],
        task_depart: [value.task_depart, Validators.required],
        task_destination: [value.task_destination, Validators.required],
        task_detail: [value.task_detail],
        task_status: [value.task_status],
        task_assigned_by: [this.storage.identity, Validators.required]
      });

      this.loading = false;
      this.FormReady = true;
      this.TaskDetail.unsubscribe();
    });
  }

  updateForm() {
    this.modal.confirm({
      nzTitle: 'Are you sure to UPDATE this task?',
      nzOkText: 'Yes',
      nzOnOk: () => {
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
      },
      nzCancelText: 'No'
    });
  }

  searchDriver() {
    this.ModalVisible = true;
    console.log(this.TaskFormGroup.get('task_date_start').value + ' - ' + this.TaskFormGroup.get('task_date_end').value);
    this.manageTaskService.SelectDriver(this.TaskFormGroup.get('task_date_start').value, this.TaskFormGroup.get('task_date_end').value);

    this.manageTaskService.$SelectDriver.subscribe(value => {
      this.ListDriver = value;
      this.LoadingDriver = false;
    });
  }

  onDriverSelected(ID, NAME) {
    this.ModalVisible = false;

    this.TaskFormGroup.patchValue({
      task_driver: NAME,
      driver_identity: ID
    });
  }

  onModalCancel() {
    this.ModalVisible = false;
  }

}
