import {User} from "./user";
import {Time} from "@angular/common";

export interface Post {
  id?:string,
  user:User,
  title?:string,
  image?:string,
  createAt?:string,
  status?:string,
  content?:string,
  description?:string,
  numberOfLike?:string
}
