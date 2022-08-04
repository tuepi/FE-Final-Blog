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

  currentUserId : any;

  login() {
    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password).pipe(first()).subscribe(data => {
      console.log(data.roles)
      localStorage.setItem('ACCESS_TOKEN', data.accessToken);
      localStorage.setItem('ROLE', data.roles);
      localStorage.setItem('ID', data.id);
      localStorage.setItem('USERNAME', data.username);
      localStorage.setItem('FULLNAME', data.fullName);
      if (data.roles[0].authority == 'ROLE_USER') {
        this.toast.success({detail: "THÔNG BÁO", summary: "Đăng nhập thành công!!!", duration: 2000})
        this.route.navigate([''])
      }
    }, error => {
      this.toast.error({detail: "LỖI", summary: "Đăng nhập thất bại!!!", duration: 2000})
    })
  }
}
