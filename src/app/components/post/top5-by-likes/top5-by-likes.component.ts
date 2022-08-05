import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post.service";
import {Post} from "../../../models/post";

@Component({
  selector: 'app-top5-by-likes',
  templateUrl: './top5-by-likes.component.html',
  styleUrls: ['./top5-by-likes.component.css']
})
export class Top5ByLikesComponent implements OnInit {

  top5Posts : Post[] | any

  constructor(private postService : PostService) { }

  ngOnInit(): void {
    this.top5ByLikes()
  }

  top5ByLikes() {
    this.postService.top5ByLikes().subscribe(data => {
        console.log(data)
        this.top5Posts = data;
      },
      error => {
        console.log(error);
      });
  }

}
