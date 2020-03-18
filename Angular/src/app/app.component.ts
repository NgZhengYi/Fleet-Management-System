import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {AuthService} from './core/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  $authStatus: Observable<boolean>;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.$authStatus = this.authService.authStatus;
  }

}
