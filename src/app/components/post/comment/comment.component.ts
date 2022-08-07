import {Component, Input, OnInit} from '@angular/core';
import {CommentsService} from "../../../services/comments.service";
import {Comment} from "../../../models/comment";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  id : any
  @Input()
  comments : Comment[] = []

  constructor(private commentsService: CommentsService,) { }

  ngOnInit(): void {

  }

}
