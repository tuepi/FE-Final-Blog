import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post.service";
import {Post} from "../../../models/post";
import {Label} from "../../../models/label";
import {LabelService} from "../../../services/label.service";
import {PostLabelService} from "../../../services/post-label.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top5-by-likes',
  templateUrl: './top5-by-likes.component.html',
  styleUrls: ['./top5-by-likes.component.css']
})
export class Top5ByLikesComponent implements OnInit {
  labelsList:any;
  posts: Post | any;
  relativeList: any
  top5Posts : Post[] | any
  listLabel: any = []

  constructor(private postService : PostService,
              private labelService: LabelService) { }

  ngOnInit(): void {
    this.top5ByLikes()
    this.getAllLabels()
  }

  top5ByLikes() {
    this.postService.top5ByLikes().subscribe(data => {
        this.top5Posts = data;
      },
      error => {
        console.log(error);
      });
  }

  getAllLabels() {
    this.labelService.getAllLabels().subscribe((data) => {
      this.listLabel = data;
    })
  }

  // getAllPostRelative() {
  //   this.postService.relativePost(this.posts.post).subscribe((result) => {
  //     console.log(result)
  //     this.relativeList = result;
  //   }, error => {
  //     console.log("Lỗi");
  //   });
  // }
  // getAllLabelByPostId() {
  //   this.postService.allLabelsByPostId(this.posts.post).subscribe((result) => {
  //     console.log(result)
  //     this.labelsList = result;
  //   }, error => {
  //     console.log("Lỗi");
  //   });
  // }


//
// setLabel(labelId: any) {
//     localStorage.setItem('labelId', labelId)
// }



}
