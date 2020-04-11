import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {ManageTaskService} from '../manage-task.service';

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.css']
})
export class TaskHistoryComponent implements OnInit {
  $HistorySubject: Subscription;
  HistoryData = [];

  constructor(private manageTaskService: ManageTaskService) {
  }

  ngOnInit(): void {
    this.manageTaskService.TaskHistory();

    this.$HistorySubject = this.manageTaskService.$History.subscribe(value => {
      // console.log(value);
      this.HistoryData = value;
      this.$HistorySubject.unsubscribe();
    });
  }

}
