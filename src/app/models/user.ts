import {Role} from "./role";

export interface User {
  id?: string | any;
  username?: string;
  fullName?: string;
  password?: string | any;
  confirmPassword?: string | any;
  // phone?:string;
  roles?: [Role],
  enabled?: string,
  numberPhone?:string,
  avatar?: string,
  email?: string,
  address?: string,
  createAt?: string,
  action?: string,
  status?: string,
}
