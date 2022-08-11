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
  listLabelValue: any = [];

  jsToday: any = '';
  // title = "cloudsSorage";
  selectedFile: File | any;
  fb: any;
  downloadURL: Observable<string> | any;
  checkImage = false;
  isNull = false;
  titleValue: any;
  descriptionValue: any;
  contentValue: any;
  today: number = Date.now();
  fullName = localStorage.getItem('FULLNAME');

  labelSelected: number[] = [];
  labels: any = [];
  // dropdownList: any = [] ;
  selectedItems: any = [];
  // dropdownSettings: IDropdownSettings = {};
  // item: any = {}
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
              private postService: PostService,
              private router: Router,
              private labelService: LabelService,
              private toast: NgToastService) {
    this.checkForm()
  }

  ngOnInit(): void {
    if (this.title != null) {
      this.isNull = true
    }
    this.getAllLabels()
  }

  changeLabel(event: any, label: number) {
    if (event.target.checked) {
      this.labelSelected = [...this.labelSelected, label];
    } else {
      this.labelSelected = this.labelSelected.filter(el => el != label);
    }
    return this.labelSelected;
  }


  get title() {
    return this.createForm.get('title')
  }

  get status() {
    return this.createForm.get('status')
  }

  get description() {
    return this.createForm.get('description')
  }

  get content() {
    return this.createForm.get('content')
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
      title: this.createForm.value.title,
      description: this.createForm.value.description,
      image: this.fb,
      content: this.createForm.value.content,
      status: this.createForm.value.status,
      user: {
        id: localStorage.getItem('ID')
      },
      numberOfLike: 0,
      // createAt : this.today
    };
    return post;
  }

  savePost() {
    const post = this.setNewPost()
    this.postService.save(post).subscribe((data) => {
      this.sendLabel(data.id)
      this.toast.success({detail: "ALERT", summary: "UPLOAD SUCCESS!!!", duration: 2000})
      this.router.navigate(['/']);
    }, error => {
      this.toast.error({detail: "ALERT", summary: "UPLOAD FAIlED!!!", duration: 2000})
      console.log(error)
    })
  }

  checkForm() {
    if (this.titleValue != null && this.descriptionValue != null && this.contentValue != null) {
      return false
    }
    return true
  }

  checkBox(event: any) {
    this.listLabelValue.push(event.value)
  }

  sendLabel(id: any) {
    this.postService.getAllLabels(id, this.listLabelValue).subscribe((data) => {
    }, error => {
      console.log(error)

    })
  }

  getAllLabels() {
    this.labelService.getAllLabels().subscribe((data) => {
      this.labels = data
    })
  }


}
