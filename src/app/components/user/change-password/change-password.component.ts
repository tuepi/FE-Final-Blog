import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {NgToastService} from "ng-angular-popup";
import {first} from "rxjs";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  currentUserId = localStorage.getItem('ID')
  username = localStorage.getItem('USERNAME')

  changeForm = new FormGroup({
    id : new FormControl(),
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
  })

  get oldPassword() {
    return this.changeForm.get('oldPassword')
  }

  get password() {
    return this.changeForm.get('password')
  }

  get confirmPassword() {
    return this.changeForm.get('confirmPassword')
  }

  constructor(private activatedRoute: ActivatedRoute,
              private route: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private toast: NgToastService) {
  }

  ngOnInit(): void {
  }

  private setNewUser() {

    const user: User = {
      id : this.currentUserId,
      password: this.changeForm.value.password,
      confirmPassword: this.changeForm.value.confirmPassword
    };
    return user;
  }

  changePassword() {
        const user = this.setNewUser();
        if (this.changeForm.value.oldPassword != this.changeForm.value.password) {
          if (this.changeForm.value.password == this.changeForm.value.confirmPassword) {
            this.userService.changePassword(this.currentUserId, this.changeForm.value.oldPassword, user).subscribe(data => {
              if (data.id != null) {
                this.toast.success({detail: "THÔNG BÁO", summary: "Thay đổi mật khẩu thành công", duration: 1500});
                this.authenticationService.logout();
                this.route.navigate(['/login']);
              } else {
                this.toast.warning({detail: "THÔNG BÁO", summary: "Mật khẩu cũ không đúng!", duration: 1500})
              }
            }, error => {
              console.log(error)
            });
          } else {
            this.toast.warning({detail: "THÔNG BÁO", summary: "Mật khẩu nhập lại không giống!", duration: 1500})
          }
        } else {
          this.toast.warning({detail: "THÔNG BÁO", summary: "Mật khẩu mới giống mật khẩu cũ!", duration: 1500})
        }
  }
}
