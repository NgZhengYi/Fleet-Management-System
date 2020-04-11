import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ManageUserService} from '../manage-user.service';

@Component({
  selector: 'app-workshop-list',
  templateUrl: './workshop-list.component.html',
  styleUrls: ['./workshop-list.component.css']
})
export class WorkshopListComponent implements OnInit {
  loading = true;
  workshopList = [];
  $workshop: Subscription;

  constructor(private manageUserService: ManageUserService) {
  }

  ngOnInit(): void {
    this.manageUserService.LoadWorkshopList();

    this.$workshop = this.manageUserService.$WorkshopSubject.subscribe(value => {
      this.workshopList = value;
      this.loading = false;
      this.$workshop.unsubscribe();
    });
  }

}
