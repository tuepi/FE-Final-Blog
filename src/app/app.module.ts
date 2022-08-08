import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "./helper/jwt-interceptor";
import {ErrorInterceptor} from "./helper/error-interceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgToastModule} from "ng-angular-popup";
import { DisplayPostsComponent } from './components/post/display-posts/display-posts.component';
import { GetAllPublicStatusComponent } from './components/post/get-all-public-status/get-all-public-status.component';
import { GetMyPostsComponent } from './components/user/get-my-posts/get-my-posts.component';
import {DetailComponent} from "./components/post/detail/detail.component";
import { CreatePostComponent } from './components/post/create-post/create-post.component';
import {EditorModule} from "@tinymce/tinymce-angular";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {NgxPaginationModule} from "ngx-pagination";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatRadioModule} from "@angular/material/radio";
import {MatIconModule} from "@angular/material/icon";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import { Top5ByLikesComponent } from './components/post/top5-by-likes/top5-by-likes.component';
import { ListLabelComponent } from './components/post/list-label/list-label.component';
import { GetAllComponent } from './components/admin/get-all/get-all.component';
import { GetPublicAndMyPrivateComponent } from './components/user/get-public-and-my-private/get-public-and-my-private.component';
import {UpdateUserComponent} from "./components/user/update-user/update-user.component";
import { EditPostComponent } from './components/post/edit-post/edit-post.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopPostComponent } from './components/post/top-post/top-post.component';
import { DeletePostComponent } from './components/post/delete-post/delete-post.component';
import { ChangePasswordComponent } from './components/user/change-password/change-password.component';
import { CommentComponent } from './components/post/comment/comment.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RatingComponent } from './components/post/rating/rating.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    DisplayPostsComponent,
    DetailComponent,
    DisplayPostsComponent,
    GetAllPublicStatusComponent,
    GetMyPostsComponent,
    CreatePostComponent,
    Top5ByLikesComponent,
    ListLabelComponent,
    GetAllComponent,
    GetPublicAndMyPrivateComponent,
    UpdateUserComponent,
    GetPublicAndMyPrivateComponent,
    EditPostComponent,
    NavbarComponent,
    FooterComponent,
    TopPostComponent,
    DeletePostComponent,
    ChangePasswordComponent,
    CommentComponent,
    ProfileComponent,
    RatingComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgToastModule,
        EditorModule,
        MatInputModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatRadioModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatPaginatorModule,
        NgxPaginationModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
        FormsModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor, multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
