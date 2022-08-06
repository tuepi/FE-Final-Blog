import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Post} from "../../../models/post";
import {finalize, Observable} from "rxjs";
import {Label} from "../../../models/label";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {NgToastService} from "ng-angular-popup";
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  postForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    title: new FormControl(''),
    image: new FormControl(''),
    createAt: new FormControl(''),
    status: new FormControl(''),
    content: new FormControl(''),
    description: new FormControl(''),
    numberOfLike: new FormControl(''),
    user: new FormControl('')
  })
  postId: any;
  post: Post | any;
  jsToday: any = '';
  downloadURL: Observable<string> | any;
  fullName = localStorage.getItem('FULLNAME');
  labels: Label[] = []
  fb : any
  content : any;

  constructor(private postService: PostService,
              private router: Router,
              private storage: AngularFireStorage,
              private toast: NgToastService,
              private activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(parammap => {
      this.postId = parammap.get('id');
      console.log("post: ", this.postId)
      this.postService.findById(this.postId).subscribe(data => {
        this.content = data.content
        this.fb = data.image;
        this.postForm.patchValue({
          title: data.title,
          description: data.description,
          status: data.status,
          image: data.image,
          content: data.content,
          createAt: data.createAt
        })
        // @ts-ignore

        document.getElementById('editor').innerHTML = data.content
      }, error => {
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
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  editPost() {
    this.post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description,
      image: this.fb,
      content: this.postForm.value.content,
      status: this.postForm.value.status,
      createAt: this.postForm.value.createAt,
      user: {
        id: localStorage.getItem('ID')
      },
      numberOfLike: 0
    }
    this.postService.updatePost(this.postId, this.post).subscribe(() => {
      this.toast.success({detail: "Thong Bao", summary: "Sua Thanh Cong", duration: 3000})
      this.router.navigateByUrl("/")
    }, error => {
      console.log(error)
    })
  }
}
