import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  postOwner = false;
  obj: any;
  id: any

  constructor(private acctiveRouter: ActivatedRoute,
              private postService: PostService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.getBlog()
    this.postOwner = localStorage.getItem('ID') == this.obj.user.id ? true : false;
    console.log(this.obj);
  }

  deletePost(id: any) {
    this.postService.deletePost(id).subscribe(() => {

      this.router.navigate(['/'])
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


