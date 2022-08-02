import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  isLogin = false;

  constructor(private postService : PostService,
              private router : Router) { }

  ngOnInit(): void {
    this.isLogin = localStorage.getItem('ID') == null ? false : true;
  }

  logout() {
    localStorage.clear();
    this.isLogin = false;
    this.router.navigate(['/'])
  }
}
