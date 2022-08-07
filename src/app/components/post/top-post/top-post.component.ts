import {Component, OnInit} from '@angular/core';
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";
import {Comment} from "../../../models/comment";
import {CommentsService} from "../../../services/comments.service";

@Component({
  selector: 'app-top-post',
  templateUrl: './top-post.component.html',
  styleUrls: ['./top-post.component.css']
})
export class TopPostComponent implements OnInit {

  topPost: Post | any
  top5Posts: Post[] | any
  length: any

  constructor(private postService: PostService,
              private commentsService: CommentsService) {
  }

  ngOnInit(): void {
    this.top5ByLikes()

  }

  top5ByLikes() {
    this.postService.top5ByLikes().subscribe(data => {
        this.top5Posts = data;
        this.topPost = data[0]
        this.commentsService.getAllByPostId(data[0].id).subscribe(list =>
          this.length = list.length);

      },
      error => {
        console.log(error);
      });
  }


}
