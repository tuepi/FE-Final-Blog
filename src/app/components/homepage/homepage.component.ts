import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  // isLogin = false;
  // fullName : any;
  // avatar : any;
  post: Post[] = [];

  constructor(private postService : PostService,
              private router : Router,
              private toast : NgToastService) {

  }

  ngOnInit(): void {
    // this.isLogin = localStorage.getItem('ID') == null ? false : true;
    // this.fullName = localStorage.getItem('FULLNAME')
    // this.avatar = localStorage.getItem('AVATAR')
  }

  logout() {
    localStorage.clear();
    this.toast.success({detail: "THÔNG BÁO", summary: "Bạn đã đăng xuất khỏi hệ thống!!!", duration: 2000})
    // this.isLogin = false;
    this.router.navigate(['/'])
  }

  // requestLogin() {
  //   if (!this.isLogin) {
  //     this.toast.warning({detail: "YÊU CẦU", summary: "Bạn cần đăng nhập!!!", duration: 2000})
  //     this.router.navigate(['/login'])
  //   }
  // }

  getList($event: any) {
    this.post.push($event)
  }



}
