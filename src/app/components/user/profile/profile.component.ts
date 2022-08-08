import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import firebase from "firebase/compat";
import User = firebase.User;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id : any
  user : User | any
  isOwner = false
  currentUserId = localStorage.getItem('ID')

  constructor(private userService : UserService,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser()
    this.isOwner = localStorage.getItem('ID') == this.id ? true : false;
  }

  getUser() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      this.userService.findById(this.id).subscribe(data => {
        this.user = data;
      }, error => {
        console.log(error)
      });
    }, error => {
      console.log(error)
    });

  }

}
