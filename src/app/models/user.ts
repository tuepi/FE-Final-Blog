import {Role} from "./role";

export interface User {
  id?: string | any;
  username?: string;
  fullName?: string;
  password?: string | any;
  confirmPassword?: string | any;
  phone?:string;
  roles?: [Role];
  enabled?: string;
}
