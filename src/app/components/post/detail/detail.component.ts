import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../../services/post.service";
import {Post} from "../../../models/post";
import {NgToastModule, NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  postOwner = false;
  obj: Post  | any;
  id: any

  constructor(private acctiveRouter: ActivatedRoute,
              private postService: PostService,
              private router: Router,
              private toast : NgToastService) {
  }

  ngOnInit(): void {
    this.getBlog()
  }

  deletePost(id: any) {
    this.postService.deletePost(id).subscribe(() => {
      this.router.navigate(['/user']) //sửa chỗ này của mạnh
      this.toast.success({detail: "THÔNG BÁO", summary: "Bạn đã xóa bài!!!", duration: 1500})
    }, error => {
      console.log(error);
    });
  }

   getBlog() {
    this.acctiveRouter.paramMap.subscribe((param) => {
      this.id = param.get('id');
      console.log(param);
      this.postService.findById(this.id).subscribe((data) => {
        console.log("data: ", data);
        this.obj = data;

        this.displayContent(this.obj.content)
        this.postOwner = localStorage.getItem('ID') == this.obj.user.id ? true : false;
        console.log("obj: ", this.obj)
        console.log("postowner: ", this.postOwner)
      });
    });

  }

  displayContent(content : any) {
    // @ts-ignore
    document.getElementById('content').innerHTML = content;
  }
}


