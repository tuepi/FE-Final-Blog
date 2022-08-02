import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./components/homepage/homepage.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {DisplayPostsComponent} from "./components/display-posts/display-posts.component";
import {GetAllPublicStatusComponent} from "./components/get-all-public-status/get-all-public-status.component";

const routes: Routes = [
  {
    path : '',
    component : HomepageComponent,
    children : [
      {
        path : '',
        component : GetAllPublicStatusComponent
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
