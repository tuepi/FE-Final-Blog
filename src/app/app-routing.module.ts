import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./components/homepage/homepage.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {DisplayPostsComponent} from "./components/post/display-posts/display-posts.component";
import {GetAllPublicStatusComponent} from "./components/post/get-all-public-status/get-all-public-status.component";
import {DetailComponent} from "./components/post/detail/detail.component";
import {CreatePostComponent} from "./components/post/create-post/create-post.component";

const routes: Routes = [
  {
    path : '',
    component : HomepageComponent,
    children : [
      {
        path : '',
        component : GetAllPublicStatusComponent
      },
      {
        path : 'detail/:id',
        component : DetailComponent
      },
      {
        path : 'create',
        component : CreatePostComponent
      }
    ]
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
