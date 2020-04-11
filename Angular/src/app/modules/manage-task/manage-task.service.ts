import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageTaskService {
  $TaskList: Subject<any> = new Subject<any>();
  $SingleTask: Subject<any> = new Subject<any>();
  $History: Subject<any> = new Subject<any>();
  $SelectDriver: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  TaskList() {
    this.http.get<{ message: string; todayTask: any; upcomingTask: any; unassignedTask: any }>(
      environment.nodeUrl + '/task/TaskList'
    ).subscribe(response => {
      if (response.message === 'Success') {
        const taskList = {todayTask: response.todayTask, upcomingTask: response.upcomingTask, unassignedTask: response.unassignedTask};
        this.$TaskList.next(taskList);
      }
    });
  }

  NewTask(newTask) {
    return this.http.post<{ message: string }>(
      environment.nodeUrl + '/task/NewTask', {newTask}
    ).pipe(map(response => {
      if (response.message === 'Success') {
        return response.message;
      } else {
        return response.message;
      }
    }));
  }

  SingleTask(ID) {
    this.http.post<{ message: string; result: any }>(
      environment.nodeUrl + '/task/SingleTask', {ID}
    ).subscribe(response => {
      if (response.message === 'Success') {
        this.$SingleTask.next(response.result);
      }
    });
  }

  UpdateTask(DETAIL) {
    return this.http.post<{ message: string }>(
      environment.nodeUrl + '/task/UpdateTask', {DETAIL}
    ).pipe(map(response => {
      if (response.message === 'Success') {
        return response.message;
      } else {
        return response.message;
      }
    }));
  }

  TaskHistory() {
    this.http.get<{ message: string; result: any }>(
      environment.nodeUrl + '/task/TaskHistory'
    ).subscribe(async response => {
      if (response.message === 'Success') {
        this.$History.next(response.result);
      }
    });
  }

  SelectDriver() {
    this.http.get<{message: string; result: any}>(
      environment.nodeUrl + '/task/SelectDriver'
    ).subscribe(async response => {
      if (response.message === 'Success') {
        this.$SelectDriver.next(response.result);
      }
    });
  }

}
