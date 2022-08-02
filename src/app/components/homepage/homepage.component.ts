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

  id: any;

  posts : Post[] | any;

  constructor(private postService : PostService,
              private router : Router) { }

  ngOnInit(): void {
    this.getAllByPublicStatus()
  }

  getAllByPublicStatus() {
    this.postService.getAllByPublicStatus().subscribe(result => {
      console.log(result.content)
      this.posts = result.content;
    }, error => {
      console.log("Lỗi");
    });
  }

}
