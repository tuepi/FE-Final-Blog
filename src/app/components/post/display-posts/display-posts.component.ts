import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-display-posts',
  templateUrl: './display-posts.component.html',
  styleUrls: ['./display-posts.component.css']
})
export class DisplayPostsComponent implements OnInit {
  //
  // p : number = 1;
  // total: number = 0;
  //
  // @Input() posts: Post[] | any;
  //
  // constructor() { }
  //
  // ngOnInit(): void {
  // }
  //
  // pageChangeEvent(event: number){
  //   this.p = event;
  //   // getAllByPublicStatus();
  // }


  id: any;
  adminCheck = false;
  obj : Post | any;

  @Input()
  posts : Post[] | any;
  p : number = 1;
  total: number = 0;
  constructor(private postService : PostService,
              private activatedRoute : ActivatedRoute,
              private router : Router,
              private toast : NgToastService) { }

  ngOnInit(): void {
    this.adminCheck = localStorage.getItem('ROLE') == 'ROLE_ADMIN' ? true : false;
  }

  // getAllByPublicStatus() {
  //   this.postService.getAllByPublicStatus().subscribe(result => {
  //     console.log(result)
  //     this.posts = result;
  //   }, error => {
  //     console.log("Lỗi");
  //   });
  // }

  // getAllByPublicStatus(){
  //   // @ts-ignore
  //   this.postService.getAllByPublicStatus(this.p).subscribe((response: any) => {
  //     this.posts = response;
  //     this.total = response.total;
  //   });
  // }

  /**
   * Write code on Method
   *
   * @return response()
   */

  pageChangeEvent(event: number){
    this.p = event;
    // kéo xuống khoảng cách 500px thì xuất hiện nút Top-up
    var offset = 500;
// thời gian di trượt 0.75s ( 1000 = 1s )
    var duration = 750;
    // @ts-ignore
    $(function(){
      // @ts-ignore
      $(window).scroll(function () {
        // @ts-ignore
        if ($(this).scrollTop() > offset)
          { // @ts-ignore
            $('#top-up').fadeIn(duration);
          }else
          { // @ts-ignore
            $('#top-up').fadeOut(duration);
          }
      });
      // @ts-ignore
      $('#top-up').click(function () {
        // @ts-ignore
        $('body,html').animate({scrollTop: 0}, duration);
      });
    });
    // this.getAllByPublicStatus();
  }

}
