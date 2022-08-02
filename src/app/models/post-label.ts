import {Post} from "./post";
import {Label} from "./label";

export interface PostLabel {
  id?:number,
  post:Post,
  label:Label
}
