import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/post";

@Component({
  selector: 'app-display-posts',
  templateUrl: './display-posts.component.html',
  styleUrls: ['./display-posts.component.css']
})
export class DisplayPostsComponent implements OnInit {

  @Input() posts: Post[] | any;

  constructor() { }

  ngOnInit(): void {
  }

}
