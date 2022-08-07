import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../../services/post.service";
import {Post} from "../../../models/post";
import {NgToastModule, NgToastService} from "ng-angular-popup";
import {CommentsService} from "../../../services/comments.service";
import {Comment} from "../../../models/comment";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  adminCheck=false;
  isLogin = false;
  postOwner = false;
  obj: Post  | any;
  id: any;
  comments : Comment[] = []

  commentForm = new FormGroup({
    content: new FormControl(),
  })


  constructor(private acctiveRouter: ActivatedRoute,
              private postService: PostService,
              private commentsService: CommentsService,
              private router: Router,
              private toast : NgToastService) {
  }

  ngOnInit(): void {
    this.adminCheck = localStorage.getItem('ROLE') == 'ROLE_ADMIN' ? true : false;
    this.getBlog()
    this.postOwner = localStorage.getItem('ID') == this.obj.user.id ? true : false;
    this.isLogin = localStorage.getItem('ID') == null ? false : true;
  }

  deletePost(id: any) {
    this.postService.deletePost(id).subscribe(() => {
      this.router.navigate(['/user']) //sửa chỗ này của mạnh
      this.toast.success({detail: "THÔNG BÁO", summary: "Bạn đã xóa bài!!!", duration: 1500})
    }, error => {
      console.log(error);
    });
  }

  //lấy ds cmt
   getBlog() {
    this.acctiveRouter.paramMap.subscribe((param) => {
      this.id = param.get('id');
      this.commentsService.getAllByPostId(this.id).subscribe(list =>
        this.comments = list);
      this.postService.findById(this.id).subscribe((data) => {
        this.obj = data;
        this.displayContent(this.obj.content)
        this.postOwner = localStorage.getItem('ID') == this.obj.user.id ? true : false;
      });
    });
  }

  displayContent(content : any) {
    // @ts-ignore
    document.getElementById('content').innerHTML = content;
  }

  setNewComment() {
    const comment = {
      content : this.commentForm.value.content,
      user : {
        id : localStorage.getItem('ID')
      },
      post : {
        id : this.id
      }
    }
    return comment
  }

  createComment() {
    const comment = this.setNewComment()
    console.log('comt',comment);
    this.commentsService.save(comment).subscribe((data) => {
      this.toast.success({detail: "THÔNG BÁO", summary: "Bạn đã bình luận!!!", duration: 2000})
      // this.router.navigate(['/detail', this.id]);
      window.location.reload()
      this.commentForm.reset()
    }, error => {
      console.log(error)
    })

  }

  requestLogin() {
    if (!this.isLogin) {
      this.toast.warning({detail: "YÊU CẦU", summary: "Bạn cần đăng nhập!!!", duration: 2000})
      this.router.navigate(['/login'])
    }
  }
}


