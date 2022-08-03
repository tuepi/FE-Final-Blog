import {User} from "./user";
import {Time} from "@angular/common";

export interface Post {
  id?:string,
  user?:User | any,
  title?:string,
  image?:string,
  createAt?:string | any,
  status?:string,
  content?:string,
  description?:string,
  numberOfLike?: string | any
}
