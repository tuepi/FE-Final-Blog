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
  p : number = 1;
  total: number = 0;
  constructor(private postService : PostService,
              private router : Router) { }

  ngOnInit(): void {
    this.getAllByPublicStatus()
  }

  getAllByPublicStatus() {
    this.postService.getAllByPublicStatus().subscribe(result => {
      this.posts = result;
    }, error => {
      console.log("Lỗi");
    });
  }
  // getAllByPublicStatus(){
  //   this.postService.getAllByPublicStatus(this.p).subscribe((response: any) => {
  //     console.log(response)
  //       this.posts = response.data;
  //       this.total = response.total;
  //     });
  // }

  // pageChangeEvent(event: number){
  //   this.p = event;
  //   this.getAllByPublicStatus();
  // }

}
