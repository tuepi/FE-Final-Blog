import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(32)]),
    fullName: new FormControl('', [ Validators.minLength(6), Validators.maxLength(32)]),
    phone: new FormControl('', [Validators.required,Validators.pattern("(03|05|07|08|09)+([0-9]{8})")]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
  });

  constructor(private authenticationService : AuthenticationService,
              private router : Router,
              private toast : NgToastService) {}

  get username(){
    return this.registerForm.get('username')
  }

  get fullName(){
    return this.registerForm.get('fullName')
  }
  get password(){
    return this.registerForm.get('password')
  }

  get confirmPassword(){
    return this.registerForm.get('confirmPassword')
  }

  get phone(){
    return this.registerForm.get('phone')
  }


  ngOnInit(): void {
  }

  register() {
    const user = this.setNewUser()
    if (user.password === user.confirmPassword) {
      this.authenticationService.register(user).subscribe((data) => {
        this.toast.success({detail: "THÔNG BÁO", summary: "Đăng ký thành công",duration: 3000})
        this.registerForm.reset();
        this.router.navigate(['/login']);
      }, err => {
        console.log(err);
      });
    } else {
      alert("Mật khẩu không trùng khớp");
    }
  }

  private setNewUser() {
    const user: User = {
      username: this.registerForm.value.username,
      fullName: this.registerForm.value.fullName,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      phone: this.registerForm.value.phone
    };
    return user;
  }





}
