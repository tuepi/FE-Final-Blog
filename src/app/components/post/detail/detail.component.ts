import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../../services/post.service";
import {Post} from "../../../models/post";
import {NgToastModule, NgToastService} from "ng-angular-popup";
import {CommentsService} from "../../../services/comments.service";
import {Comment} from "../../../models/comment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostLabelService} from "../../../services/post-label.service";
import {PostLabel} from "../../../models/post-label";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  postList:any;
  labelId:any;
  labelsList: PostLabel[]=[];
  adminCheck = false;
  isLogin = false;
  postOwner = false;
  obj: Post | any;
  id: any;
  comments: Comment[] = []
  userId = localStorage.getItem('ID');
  avatar = localStorage.getItem('AVATAR')
  postId: any;
  likedCheck = false;
  toDay: any;
  nowTime: any;
  commentForm = new FormGroup({
    content: new FormControl(),
  })


  constructor(private acctiveRouter: ActivatedRoute,
              private postService: PostService,
              private commentsService: CommentsService,
              private router: Router,
              private toast : NgToastService,
              private postLabelService: PostLabelService) {
  }

  ngOnInit(): void {
    this.getBlog()
    this.adminCheck = localStorage.getItem('ROLE') == 'ROLE_ADMIN' ? true : false;
    this.postOwner = localStorage.getItem('ID') == this.obj.user.id ? true : false;
    this.likePost()
  }


  checkLogin() {
    this.isLogin = localStorage.getItem('ID') == null ? false : true;
  }

  deletePost(id: any) {
    this.postService.deletePost(id).subscribe(() => {
      this.router.navigate(['/user']) //sửa chỗ này của mạnh
      this.toast.success({detail: "SUCCESS", summary: "YOU HAD DELETE THIS POST!!!", duration: 1500})
    }, error => {
      console.log(error);
    });
  }

  //lấy ds cmt
  getBlog() {
    this.acctiveRouter.paramMap.subscribe((param) => {
      this.id = param.get('id');
      this.postService.allLabelsByPostId(this.id).subscribe((result) => {
        this.labelsList = result;
        this.labelId= result[0].label.id;
        this.postService.relativePost(this.labelId).subscribe((result) => {
          this.postList = result;
        });
      })
      this.postService.likedCheck(this.id, this.userId).subscribe((liked) => {
        if (liked == null) {
          this.likedCheck = false
        } else {
          this.likedCheck = true
        }
      })
      this.commentsService.getAllByPostId(this.id).subscribe(list =>
        this.comments = list);
      this.postService.findById(this.id).subscribe((data) => {
        this.obj = data;
        this.getTime();
        this.displayContent(this.obj.content)
        this.postOwner = localStorage.getItem('ID') == this.obj.user.id ? true : false;
      });
    });
  }

  displayContent(content: any) {
    // @ts-ignore
    document.getElementById('content').innerHTML = content;
  }

  setNewComment() {
    const comment = {
      content: this.commentForm.value.content,
      user: {
        id: localStorage.getItem('ID')
      },
      post: {
        id: this.id
      }
    }
    return comment
  }

  createComment() {
    const comment = this.setNewComment()
    this.commentsService.save(comment).subscribe((data) => {
      this.toast.success({detail: "ALERT", summary: "YOU HAVE COMMENT!!!", duration: 2000})
      // this.router.navigate(['/detail', this.id]);
      window.location.reload()
    }, error => {
      console.log(error)
    })

  }

  requestLogin() {
    if (!this.isLogin) {
      this.toast.warning({detail: "REQUIRE", summary: "YOU NEED TO LOGIN TO COMMENT!!!", duration: 2000})
      this.router.navigate(['/login'])
    }
  }

  getTime() {
    this.toDay = this.obj.createAt.toString().split('T')[0]
    this.nowTime = this.obj.createAt.toString().split('T')[1]
  }

  likePost() {
    this.userId = localStorage.getItem('ID')
    this.postId = this.obj.id
    this.postService.likePost(this.postId, this.userId).subscribe((countLike) => {
      this.likedChecker()
      this.getBlog();
    })
  }

  likedChecker() {
    this.userId = localStorage.getItem('ID')
    this.postService.likedCheck(this.obj.id, this.userId).subscribe((liked) => {
      if (liked == null) {
        this.likedCheck = false
      } else {
        this.likedCheck = true
      }
    })
  }

  toComment() {
    window.scroll({
      top: 1120,
      left: 0,
      behavior: 'smooth'
    });
  }

  //tự động lăn cmt
  scrollToElement( $element: any ): void {
    $element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }

}



