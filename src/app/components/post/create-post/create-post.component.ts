import {Component, OnInit} from '@angular/core';
import {finalize, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {LabelService} from "../../../services/label.service";
import {Label} from "../../../models/label";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  jsToday : any = '';
  // title = "cloudsSorage";
  selectedFile: File | any;
  fb: any;
  downloadURL: Observable<string> | any;
  checkImage = false;
  isNull = false;

  today : number = Date.now();

  fullName = localStorage.getItem('FULLNAME');
  labels: Label[] = []

  createForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
    status: new FormControl('1', [Validators.required]),
    image: new FormControl(),
    content: new FormControl('', [Validators.required, Validators.maxLength(8000)]),
    user: new FormControl(),
    // createAt: new FormControl(),
    numberOfLike: new FormControl()
  })

  constructor(private storage: AngularFireStorage,
              private postService : PostService,
              private router : Router,
              private labelService: LabelService,
              private toast: NgToastService) {}

  ngOnInit(): void {
    this.getAllLabels()
    if (this.title != null) {
      this.isNull = true
    }
  }


  get title(){
    return this.createForm.get('title')
  }

  get status(){
    return this.createForm.get('status')
  }

  get description(){
    return this.createForm.get('description')
  }

  get content(){
    return this.createForm.get('content')
  }

  getAllLabels() {
    this.labelService.getAllLabels().subscribe((data) => {
      this.labels = data;
    })
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
              this.checkImage = this.fb !== null ? true : false;
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


  private setNewPost() {
    const post: Post = {
      title : this.createForm.value.title,
      description : this.createForm.value.description,
      image: this.fb,
      content: this.createForm.value.content,
      status : this.createForm.value.status,
      user : {
        id : localStorage.getItem('ID')
      },
      numberOfLike : 0,
      // createAt : this.today
    };
    return post;
  }

  savePost() {
    const post = this.setNewPost()
    console.log(post)
    this.postService.save(post).subscribe((data) => {
      console.log(data);
      this.toast.success({detail: "THÔNG BÁO", summary: "Đăng bài thành công!!!", duration: 2000})
      this.router.navigate(['/']);
    }, error => {
      console.log(error)
    })

  }
}
