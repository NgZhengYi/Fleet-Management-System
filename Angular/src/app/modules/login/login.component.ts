import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';

import {AuthService} from '../../core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  returnUrl: string;

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/home';
  }

  submitForm() {
    if (this.formGroup.invalid) {
      return;
    }

    this.authService.login(this.formGroup.value.username, this.formGroup.value.password)
      .pipe(first())
      .subscribe(value => {
        if (value === 'Success') {
          this.router.navigateByUrl(this.returnUrl);
        } else {
          alert(value);
        }
      });
  }

}
