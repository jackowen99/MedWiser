import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean;


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private loginService: LoginService) {
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    if(sessionStorage.getItem('username')) {
      this.router.navigate(['/home']);
    }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.f.username.value, this.f.password.value).subscribe(
      data => {
        this.router.navigate(['/home']);
      },

      error => {
        Swal.fire({
          text: 'The username and/or password are not correct',
          // @ts-ignore
          type: "error",
        })
      }
    );
  }
}
