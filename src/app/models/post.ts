import {User} from "./user";

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
