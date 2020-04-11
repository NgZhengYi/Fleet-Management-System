import {Component, OnInit} from '@angular/core';
import {ManageTaskService} from './manage-task.service';

@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrls: ['./manage-task.component.css']
})
export class ManageTaskComponent implements OnInit {
  todayTaskData: [];
  upcomingTaskData: [];
  unassignedTaskData: [];
  loading = true;
  listReady = false;

  constructor(private manageTaskService: ManageTaskService) {
  }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad() {
    this.manageTaskService.TaskList();

    this.manageTaskService.$TaskList.subscribe((value: any) => {
      console.log(value);
      this.todayTaskData = value.todayTask;
      this.upcomingTaskData = value.upcomingTask;
      this.unassignedTaskData = value.unassignedTask;
      this.loading = false;
      this.listReady = true;
    });
  }

}
