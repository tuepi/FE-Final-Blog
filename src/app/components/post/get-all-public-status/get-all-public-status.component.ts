import { Component, OnInit } from '@angular/core';
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-get-all-public-status',
  templateUrl: './get-all-public-status.component.html',
  styleUrls: ['./get-all-public-status.component.css']
})
export class GetAllPublicStatusComponent implements OnInit {

  id: any;

  posts : Post[] | any;

  constructor(private postService : PostService,
              private router : Router) { }

  ngOnInit(): void {
    this.getAllByPublicStatus()
  }

  getAllByPublicStatus() {
    this.postService.getAllByPublicStatus().subscribe(result => {
      console.log(result)
      this.posts = result;
    }, error => {
      console.log("Lỗi");
    });
  }

}
