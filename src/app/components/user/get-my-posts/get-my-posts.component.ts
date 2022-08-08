import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-get-my-posts',
  templateUrl: './get-my-posts.component.html',
  styleUrls: ['./get-my-posts.component.css']
})
export class GetMyPostsComponent implements OnInit {

  @Input()
  id: any;

  posts: Post[] | any;

  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getMyPosts()
  }

  getMyPosts() {
    this.postService.getMyPosts(this.id).subscribe(data => {
        console.log(data)
        this.posts = data;
      },
      error => {
        console.log(error);
      });
  }
}
