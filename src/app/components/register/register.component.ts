import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {UserService} from "../../services/user.service";
import {user} from "@angular/fire/auth";
import {Observable} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usernames : [] = [];
  selectedFile: File | any;
  fb: any;
  downloadURL: Observable<string> | any;
  checkImage = false;
  usernameValue: any
  fullNameValue: any
  numberPhone: any
  passwordValue: any
  confirmPasswordValue: any

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(32)]),
    fullName: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    numberPhone: new FormControl('', [Validators.required,Validators.pattern("(03|05|07|08|09)+([0-9]{8})")]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
  },

  );

  constructor(private authenticationService : AuthenticationService,
              private router : Router,
              private userService : UserService,
              private toast : NgToastService) {}

  get f() {
    return this.registerForm.value
  }

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
    return this.registerForm.get('numberPhone')
  }


  ngOnInit(): void {
      this.getAll()
  }

  getAll() {
    this.userService.getAll().subscribe(result => {
      this.usernames = result;
    }, error => {
      console.log("Lỗi");
    });
  }

  register() {
    const user = this.setNewUser()
    if (this.checkUsername(user.username, this.usernames)) {
      if (user.password === user.confirmPassword) {
        this.authenticationService.register(user).subscribe((data) => {
          this.toast.success({detail: "THÔNG BÁO", summary: "Đăng ký thành công", duration: 2000})
          this.registerForm.reset();
          this.router.navigate(['/login']);
        }, err => {
          console.log(err);
        });
      } else {
        this.toast.warning({detail: "CHÚ Ý", summary: "Mật khẩu nhập lại không trùng khớp", duration: 2000});
      }
    } else {
      this.toast.warning({detail: "CHÚ Ý", summary: "Tên đăng nhập đã được sử dụng!!!", duration: 2000});
    }

  }



  private checkUsername(username : any, usernames : []) : boolean {
    const check = true;
    for (let i = 0; i < usernames.length; i++) {
      if (username === usernames[i]) {
        return false;
      }
    }
    return check;
  }

  private setNewUser() {
    const user: User = {
      username: this.registerForm.value.username,
      fullName: this.registerForm.value.fullName,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      numberPhone: this.registerForm.value.numberPhone,
      address: this.registerForm.value.address,
      email: this.registerForm.value.email,
      avatar: this.fb,
    };
    return user;
  }

  checkForm() {
    if(this.checkErrorForm() && this.checkFormRegister()) {
      return false;
    }
    return true;

  }

  checkFormRegister() {
    if (this.usernameValue == null || this.fullNameValue == null || this.numberPhone == null ||
      this.passwordValue == null || this.confirmPasswordValue == null
      || this.usernameValue == "" || this.fullNameValue == "" || this.numberPhone == "" ||
      this.passwordValue == "" || this.confirmPasswordValue == ""
      || this.usernameValue == undefined || this.fullNameValue == undefined || this.numberPhone == undefined ||
      this.passwordValue == undefined || this.confirmPasswordValue == undefined

    ) {
      return false
    }
    return true
  }
  checkErrorForm() {
    if (this.registerForm.invalid == false && (this.registerForm.dirty == true || this.registerForm.touched == true)) {
      return true
    }
    return false
  }



}

function ConfirmedValidator(controlName: string, matchingControlName: string): any {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}

