import {Component, Input, OnInit} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {Post} from "../../../models/post";

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent implements OnInit {

  @Input() id : any
  obj : Post | any

  constructor(private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private router: Router,
              private toast : NgToastService) { }

  ngOnInit(): void {
    this.getBlog()
  }

  deletePost() {
    this.postService.deletePostByAdmin(this.id).subscribe(() => {
      this.router.navigate(['/admin']) //sửa chỗ này của mạnh
      this.toast.success({detail: "THÔNG BÁO", summary: "Bạn đã xóa bài!!!", duration: 1500})
    }, error => {
      console.log(error);
    });
  }

  getBlog() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      this.postService.findById(this.id).subscribe((data) => {
        this.obj = data;
      });
    });
  }

}