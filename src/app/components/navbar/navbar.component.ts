import { Component, OnInit } from '@angular/core';
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin = false;
  fullName : any;
  avatar : any;
  currentUserId : any;

  constructor(private router : Router,
              private toast : NgToastService) { }

  ngOnInit(): void {
    this.isLogin = localStorage.getItem('ID') == null ? false : true;
    this.fullName = localStorage.getItem('FULLNAME')
    this.avatar = localStorage.getItem('AVATAR')
    this.currentUserId = localStorage.getItem('ID')
  }

  logout() {
    localStorage.clear();
    this.toast.success({detail: "THÔNG BÁO", summary: "Bạn đã đăng xuất khỏi hệ thống!!!", duration: 2000})
    this.isLogin = false;
    this.router.navigate(['/'])
  }

  requestLogin() {
    if (!this.isLogin) {
      this.toast.warning({detail: "YÊU CẦU", summary: "Bạn cần đăng nhập!!!", duration: 2000})
      this.router.navigate(['/login'])
    }
  }

}
