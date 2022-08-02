import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {first} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm =new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(32)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
  })

  get username(){
    return this.loginForm.get('username')
  }

  get password(){
    return this.loginForm.get('password')
  }



  constructor(private acctiveRouter:ActivatedRoute,
              private route:Router,
              private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
  }
  login(){
    this.authenticationService.login(this.loginForm.value.username,this.loginForm.value.password).pipe(first()).subscribe(data=>{
      localStorage.setItem('ACCESS_TOKEN',data.accessToken);
      localStorage.setItem('ROLE',data.roles);
      localStorage.setItem('ID',data.id);
      localStorage.setItem('USERNAME',data.username);
      if (data.roles[0].authority=='ROLE_USER'){
        this.route.navigate([''])
      }
    },error => {
      alert('Sai con me m roi ')
    })
  }
}
