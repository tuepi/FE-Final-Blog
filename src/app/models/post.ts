import {User} from "./user";
import {Time} from "@angular/common";

export interface Post {
  id?:string,
  user?:User | any,
  title?:string | any,
  image?:string,
  createAt?:string | any,
  status?:string | any,
  content?:string | any,
  description?:string | any,
  numberOfLike?: number
}
