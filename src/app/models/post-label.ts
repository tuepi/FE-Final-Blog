import {Post} from "./post";
import {Label} from "./label";

export interface PostLabel {
  id?:string,
  post:Post,
  label:Label
}
