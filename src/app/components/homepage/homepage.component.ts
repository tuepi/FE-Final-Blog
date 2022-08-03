import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  isLogin = false;

  constructor(private postService: PostService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isLogin = localStorage.getItem('ID') == null ? false : true;
    console.log("ele:  ", document.getElementsByClassName("modal-backdrop").item(0))
    if (document.getElementById("staticBackdrop") != null) {
      // @ts-ignore
      document.getElementsByClassName("modal-backdrop").item(0).hidden = true

      console.log("ele:  ", document.getElementsByClassName("modal-backdrop").item(0))
    }
  }

  logout() {
    localStorage.clear();
    this.isLogin = false;
    this.router.navigate(['/'])
  }
}
