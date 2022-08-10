import { Component, OnInit } from '@angular/core';
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-get-public-and-my-private',
  templateUrl: './get-public-and-my-private.component.html',
  styleUrls: ['./get-public-and-my-private.component.css']
})
export class GetPublicAndMyPrivateComponent implements OnInit {

  posts: Post[] | any;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.getPublicAndMyPrivate()
  }

  getPublicAndMyPrivate() {
    this.postService.getPublicAndMyPrivate().subscribe(data => {
        this.posts = data;
      },
      error => {
        console.log(error);
      });
  }

  listBySearch($event: any) {
    this.posts = $event;
  }
}
