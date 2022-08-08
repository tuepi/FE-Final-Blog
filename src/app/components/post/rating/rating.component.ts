import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  calcRate(r : any) {
    const f = ~~r,//Tương tự Math.floor(r)
      id = 'star' + f + (r % f ? 'half' : '')
    // @ts-ignore
    id && (document.getElementById(id).checked = !0)
  }

}
