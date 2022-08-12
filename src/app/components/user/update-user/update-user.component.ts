import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import firebase from "firebase/compat";
import {finalize, Observable} from 'rxjs';
import User = firebase.User;
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {NgToastService} from "ng-angular-popup";
import {Label} from "../../../models/label";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  updateForm : FormGroup = new FormGroup({
    id: new FormControl(0),
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    numberPhone: new FormControl('',[Validators.required,Validators.pattern("(03|05|07|08|09)+([0-9]{8})")]),
    email: new FormControl('',[ Validators.required,Validators.minLength(15), Validators.maxLength(32)]),
    roles: new FormControl(''),
    fullName: new FormControl('',[ Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    address: new FormControl('',[ Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    enabled: new FormControl(''),
    createAt: new FormControl(''),
    avatar: new FormControl(''),
    action: new FormControl(''),
    status: new FormControl(''),
  })
  userId: any;
  user: User | any;
  jsToday: any = '';
  downloadURL: Observable<string> | any;
  // fullName = localStorage.getItem('FULLNAME');
  fb: any;
  labels: Label[] = [];

  constructor(private userService: UserService,
              private router: Router,
              private toast: NgToastService,
              private storage: AngularFireStorage,
              private activatedRoute: ActivatedRoute) { }
  get numberPhone() {
    return this.updateForm.get('numberPhone');
  }
  get email() {
    return this.updateForm.get('email');
  }
  get address() {
    return this.updateForm.get('address');
  }
  get fullName() {
    return this.updateForm.get('fullName');
  }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(parammap =>{
      this.userId = parammap.get('id');
      this.userService.findById(this.userId).subscribe(data => {
        this.fb = data.avatar;
        this.updateForm.patchValue({
          // id: this.userId,
          username: data.username,
          password: data.password,
          confirmPassword: data.confirmPassword,
          numberPhone: data.numberPhone,
          email: data.email,
          roles: data.roles,
          fullName: data.fullName,
          address: data.address,
          enabled: data.enabled,
          createAt: data.createAt,
          avatar: data.avatar,
          action: data.action,
          status: data.status,
        })
      },error => {
        console.log(error);
      });
    });
  }
  onFileSelected(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          // @ts-ignore
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
        }
      });
  }
  updateUser() {
    this.user = {
      id : this.userId,
      username: this.updateForm.value.username,
      password: this.updateForm.value.password,
      confirmPassword: this.updateForm.value.confirmPassword,
      numberPhone: this.updateForm.value.numberPhone,
      email: this.updateForm.value.email,
      roles: this.updateForm.value.roles,
      fullName: this.updateForm.value.fullName,
      address: this.updateForm.value.address,
      enabled: this.updateForm.value.enabled,
      createAt: this.updateForm.value.createAt,
      avatar: this.fb,
      action: 0,
      status: 0,
    }
    this.userService.updateUser(this.userId, this.user).subscribe( data => {
      localStorage.removeItem('FULLNAME');
      localStorage.removeItem('AVATAR');
      localStorage.setItem('FULLNAME', this.user.fullName);
      localStorage.setItem('AVATAR', this.user.avatar);
      this.toast.success({detail:"SUCCESS",summary:"UPDATED",duration:2000});
      this.router.navigate(["/profile", this.userId])
    },error => {
      console.log(error);
    })
  }

}
