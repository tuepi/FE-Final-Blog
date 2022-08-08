import { Component, OnInit } from '@angular/core';
import {Post} from "../../../models/post";
import {HttpClient} from "@angular/common/http";
import {PostService} from "../../../services/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // title: string;
  posts : Post[] | any;
  constructor(private postService : PostService,
              private router : Router) { }

  ngOnInit(): void {
    // this.searchPostByTitle(this.title)
    }
  searchPostByTitle(title: string) {
    this.postService.search(title).subscribe(result => {
      this.posts = result;
    }, error => {
      console.log(error)
      console.log("Lỗi");
    });
  }
}
