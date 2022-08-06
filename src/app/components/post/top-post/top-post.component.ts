import { Component, OnInit } from '@angular/core';
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-top-post',
  templateUrl: './top-post.component.html',
  styleUrls: ['./top-post.component.css']
})
export class TopPostComponent implements OnInit {

  topPost : Post | any
  top5Posts : Post[] | any

  constructor(private postService : PostService) { }

  ngOnInit(): void {
    this.top5ByLikes()
  }

  top5ByLikes() {
    this.postService.top5ByLikes().subscribe(data => {
        this.top5Posts = data;
        for (let i = 0; i < data.length; i++) {
          this.topPost = data[0]
        }
      },
      error => {
        console.log(error);
      });
  }
}
