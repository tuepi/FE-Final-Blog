import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import firebase from "firebase/compat";
import User = firebase.User;
import {PostService} from "../../services/post.service";
import * as events from "events";

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
  listTitle: any = [];
  title: any

  constructor(private router : Router,
              private toast : NgToastService,
              private postService: PostService) { }

  ngOnInit(): void {
    this.isLogin = localStorage.getItem('ID') == null ? false : true;
    this.fullName = localStorage.getItem('FULLNAME')
    this.avatar = localStorage.getItem('AVATAR')
    this.currentUserId = localStorage.getItem('ID')
  }

  logout() {
    localStorage.clear();
    this.toast.success({detail: "ALERT", summary: "YOU HAVE LOGOUT!!!", duration: 2000})
    this.isLogin = false;
    this.router.navigate(['/'])
  }

  requestLogin() {
    if (!this.isLogin) {
      this.toast.warning({detail: " REQUIRED  ", summary: "LOGIN REQUIRED TO DO THIS!!!", duration: 2000})
      this.router.navigate(['/login'])
    }
  }

  @Output()
  onSearch = new EventEmitter();

  findPostByTitle() {
     this.postService.search(this.title).subscribe(data => {
       this.onSearch.emit(data);
      this.listTitle = data;
      this.onSearch.emit(this.listTitle)
    }, error => {
      console.log(error)
    }
     )
  }

  toLabel() {
    window.scroll({
      top: 620,
      left: 0,
      behavior: 'smooth'
    });
  }

  toAbout() {
    window.scroll({
      top: 9999999,
      left: 0,
      behavior: 'smooth'
    });
  }




}
