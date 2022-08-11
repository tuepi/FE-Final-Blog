import { Component, OnInit } from '@angular/core';
import {PostLabelService} from "../../../services/post-label.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-get-by-label',
  templateUrl: './get-by-label.component.html',
  styleUrls: ['./get-by-label.component.css']
})
export class GetByLabelComponent implements OnInit {
  listPostByLabel : any = []
  id : any

  constructor(private postLabelService: PostLabelService,
              private activatedRoute: ActivatedRoute,
              private router: Router,) {
  }

  ngOnInit(): void {
    // localStorage.removeItem('labelId')
    this.getPostByLabel()
  }

  // getPostByLabel() {
  //   let labelId = localStorage.getItem('labelId')
  //   this.listPostByLabel = []
  //   this.postLabelService.getAllPostLabel(labelId).subscribe((data) => {
  //     this.scanData(data)
  //     this.router.navigate(['/by-label/', labelId])
  //     localStorage.removeItem('labelId')
  //   } )
  // }


  getPostByLabel() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      this.listPostByLabel = []
      this.postLabelService.getAllPostLabel(this.id).subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          this.listPostByLabel.push(data[i].post)
        }
      }, error => {
        console.log(error)
      });
    }, error => {
      console.log(error)
    });

  }

  // scanData(data: any[]) {
  //   for (let i = 0; i < data.length; i++) {
  //     this.listPostByLabel.push(data[i].post)
  //   }
  // }
}
