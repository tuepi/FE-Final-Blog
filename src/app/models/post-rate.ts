import {Post} from "./post";
import {Rate} from "./rate";
import {User} from "./user";

export interface PostRate {
  id?:number,
  post:Post,
  rate:Rate,
  user:User
}
