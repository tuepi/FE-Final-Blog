import { Component, OnInit } from '@angular/core';
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-get-all',
  templateUrl: './get-all.component.html',
  styleUrls: ['./get-all.component.css']
})
export class GetAllComponent implements OnInit {

  posts: Post[] | any;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.postService.getAllForAdmin().subscribe(data => {
        console.log(data)
        this.posts = data;
      },
      error => {
        console.log(error);
      });
  }
}
