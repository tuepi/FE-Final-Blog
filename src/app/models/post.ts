import {User} from "./user";
import {Time} from "@angular/common";

export interface Post {
  id?:number,
  user:User,
  title?:string,
  image?:string,
  createAt?:string,
  status?:number,
  content?:string,
  description?:string,
  numberOfLike?:number
}
