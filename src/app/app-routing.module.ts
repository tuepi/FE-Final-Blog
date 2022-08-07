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
import {DeletePostComponent} from "./components/post/delete-post/delete-post.component";
import {ChangePasswordComponent} from "./components/user/change-password/change-password.component";

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
  },
  {
    path : 'delete/:id',
    component : DeletePostComponent
  },
  {
    path : 'change-password/:id',
    component : ChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
