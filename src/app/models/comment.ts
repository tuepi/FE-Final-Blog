import {Post} from "./post";
import {User} from "./user";

export interface Comment {
  id : string,
  content : string,
  createAt : string,
  comment : Comment | any,
  post : Post,
  user : User
}
