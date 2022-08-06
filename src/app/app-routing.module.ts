import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from "./components/homepage/homepage.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {DisplayPostsComponent} from "./components/post/display-posts/display-posts.component";
import {GetAllPublicStatusComponent} from "./components/post/get-all-public-status/get-all-public-status.component";
import {DetailComponent} from "./components/post/detail/detail.component";
import {CreatePostComponent} from "./components/post/create-post/create-post.component";
import {GetAllComponent} from "./components/admin/get-all/get-all.component";
import {GetMyPostsComponent} from "./components/user/get-my-posts/get-my-posts.component";
import {
  GetPublicAndMyPrivateComponent
} from "./components/user/get-public-and-my-private/get-public-and-my-private.component";
import {EditPostComponent} from "./components/post/edit-post/edit-post.component";

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },

  {
    path: 'create',
    component: CreatePostComponent
  },
  {
    path: 'detail/:id',
    component: DetailComponent
  },
  {
    path: 'edit/:id',
    component: EditPostComponent
  },
  {
    path: 'user',
    component: GetPublicAndMyPrivateComponent,
  },
  {
    path: 'my-posts',
    component: GetMyPostsComponent //gán vào trang cá nhân
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    component: GetAllComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
