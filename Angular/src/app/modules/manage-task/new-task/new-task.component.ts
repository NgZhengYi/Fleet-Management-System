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
  TaskFormGroup: FormGroup;

  constructor(private manageTaskService: ManageTaskService, private formBuilder: FormBuilder, private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.TaskFormGroup = this.formBuilder.group({
      task_title: ['', Validators.required],
      task_detail: [''],
      task_date: ['', Validators.required],
      task_time: ['', Validators.required],
      task_origin_location: ['', Validators.required],
      task_destination_location: ['', Validators.required],
      task_driver: [''],
      task_vehicle: ['']
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
          } else {
            this.toast.error('Error');
          }
        });
    }
  }

}
