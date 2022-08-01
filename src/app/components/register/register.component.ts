import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup = new FormGroup({
    username: new FormControl(),
    fullName: new FormControl(),
    phone: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
  });

  constructor(private authenticationService: AuthenticationService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  register() {
    const user = this.setNewUser();
    this.authenticationService.register(user).subscribe((data) => {
      console.log(data);
      alert("Thành công")
      this.registerForm.reset();
      this.router.navigate(['/login']);
    }, err => {
      console.log(err);
    });
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
