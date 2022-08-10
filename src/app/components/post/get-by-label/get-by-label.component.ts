import { Component, OnInit } from '@angular/core';
import {PostLabelService} from "../../../services/post-label.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-get-by-label',
  templateUrl: './get-by-label.component.html',
  styleUrls: ['./get-by-label.component.css']
})
export class GetByLabelComponent implements OnInit {
  listPostByLabel : any = []

  constructor(private postLabelService: PostLabelService,
              private router: Router) {
    this.getPostByLabel()
  }


  ngOnInit(): void {
    localStorage.removeItem('labelId')
    this.getPostByLabel()
  }

  getPostByLabel() {
    let labelId = localStorage.getItem('labelId')
    this.postLabelService.getAllPostLabel(labelId).subscribe((data) => {
      this.scanData(data)
      this.router.navigate(['/by-label/', labelId])
      console.log(this.listPostByLabel)
      localStorage.removeItem('labelId')
    } )
  }

  scanData(data: any[]) {
    for (let i = 0; i < data.length; i++) {
      this.listPostByLabel.push(data[i].post)
    }
  }
}
