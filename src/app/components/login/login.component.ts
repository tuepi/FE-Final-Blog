import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {first} from "rxjs";
import {NgToastService} from "ng-angular-popup";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(32)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
  })
  usernameValue: any;
  passwordValue: any

  get username() {
    return this.loginForm.get('username')
  }

  get password() {
    return this.loginForm.get('password')
  }


  constructor(private activatedRoute: ActivatedRoute,
              private route: Router,
              private authenticationService: AuthenticationService,
              private toast: NgToastService) {
  }

  ngOnInit(): void {
  }

  currentUserId: any;

  login() {
    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password).pipe(first()).subscribe(data => {
      localStorage.setItem('ACCESS_TOKEN', data.accessToken);
      localStorage.setItem('ROLE', data.roles[0].authority);
      localStorage.setItem('ID', data.id);
      localStorage.setItem('USERNAME', data.username);
      localStorage.setItem('FULLNAME', data.fullName);
      localStorage.setItem('AVATAR', data.avatar);
      if (data.roles[0].authority == 'ROLE_USER') {
        this.toast.success({detail: "SUCCESS", summary: "Login Succsess!!!", duration: 2000});
        this.route.navigate(['/user']);
        this.route.navigate(['/user']);
      } else {
        this.toast.success({detail: "ALERT", summary: "Login as Admin Succsess!!!", duration: 2000})
        this.route.navigate(['/admin']);
      }
    }, error => {
      this.toast.error({detail: "ERROR", summary: "Login Fail!!!", duration: 2000})
      this.route.navigate(['/login'])
    })
  }

  checkForm() {
    if (this.checkFormLogin() && this.checkErrorForm()) {
      return false
    }
    return true
  }

  checkFormLogin() {
    if (this.usernameValue == undefined || this.passwordValue == undefined ||
      this.usernameValue == "" || this.passwordValue == "" ||
      this.usernameValue == null || this.passwordValue == null) {
      return false
    }
    return true
  }

  checkErrorForm() {
    if (this.loginForm.invalid == false && (this.loginForm.dirty == true || this.loginForm.touched == true)) {
      return true
    }
    return false
  }
}
