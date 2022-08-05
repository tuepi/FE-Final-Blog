import {Post} from "./post";
import {Rate} from "./rate";
import {User} from "./user";

export interface PostRate {
  id?:string,
  post:Post,
  rate:Rate,
  user:User
}
