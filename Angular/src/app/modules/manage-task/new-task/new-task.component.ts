import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

import {ManageTaskService} from '../manage-task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  private storage = JSON.parse(localStorage.getItem('Fleet Management System'));
  layout = 'vertical';
  TaskFormGroup: FormGroup;
  ModalVisible = false;
  LoadingDriver = true;
  ListDriver = [];

  constructor(private manageTaskService: ManageTaskService, private formBuilder: FormBuilder, private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.TaskFormGroup = this.formBuilder.group({
      task_title: ['', Validators.required],
      task_driver: [''],
      driver_identity: [''],
      task_date_start: ['', Validators.required],
      task_date_end: ['', Validators.required],
      task_time_start: [null],
      task_time_end: [null],
      task_depart: ['', Validators.required],
      task_destination: ['', Validators.required],
      task_detail: [''],
      task_created_by: [this.storage.identity, Validators.required]
    });
  }

  submitForm() {
    console.log(this.TaskFormGroup.value);

    for (const i in this.TaskFormGroup.controls) {
      if (this.TaskFormGroup.controls[i].status === 'INVALID') {
        this.TaskFormGroup.controls[i].markAsDirty();
        this.TaskFormGroup.controls[i].updateValueAndValidity();
      }
    }

    if (this.TaskFormGroup.valid) {
      this.manageTaskService.NewTask(this.TaskFormGroup.value)
        .pipe(first())
        .subscribe(response => {
          if (response === 'Success') {
            this.toast.success('Added Successfully');
            // this.resetForm();
          } else {
            this.toast.error(response);
          }
        });
    }
  }

  resetForm() {
    this.TaskFormGroup.reset();
    this.TaskFormGroup.patchValue({
      task_created_by: this.storage.identity
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
