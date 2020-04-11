import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ManageUserService} from '../manage-user.service';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {
  loading = true;
  driverList = [];
  $driver: Subscription;

  constructor(private manageUserService: ManageUserService) {
  }

  ngOnInit(): void {
    this.manageUserService.LoadDriverList();

    this.$driver = this.manageUserService.$DriverSubject.subscribe(value => {
      // console.log(value);
      this.driverList = value;
      this.loading = false;
      this.$driver.unsubscribe();
    });
  }

}
