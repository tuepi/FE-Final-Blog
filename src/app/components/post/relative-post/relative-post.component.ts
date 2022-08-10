import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../models/post";

@Component({
  selector: 'app-relative-post',
  templateUrl: './relative-post.component.html',
  styleUrls: ['./relative-post.component.css']
})
export class RelativePostComponent implements OnInit {
  @Input() relativePosts : Post[] | any

  constructor() { }

  ngOnInit(): void {
  }

}
