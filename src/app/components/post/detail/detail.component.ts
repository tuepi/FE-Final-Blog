import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  obj: any = [];
  id: any

  constructor(private acctiveRouter: ActivatedRoute,
              private postService: PostService) {
  }

  ngOnInit(): void {
    this.acctiveRouter.paramMap.subscribe((param) => {
      this.id = param.get('id');
      console.log(param);
      this.postService.findById(this.id).subscribe((data) => {
        console.log(data);
        this.obj = data;
      });
    });
  }
}
