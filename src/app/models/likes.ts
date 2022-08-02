import {User} from "./user";
import {Post} from "./post";

export interface Likes {
  id?:number,
  user:User,
  post:Post,
  dateTime?:string

}
