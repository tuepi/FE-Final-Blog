import {User} from "./user";
import {Post} from "./post";

export interface Likes {
  id?:string,
  user:User,
  post:Post,
  dateTime?:string

}
