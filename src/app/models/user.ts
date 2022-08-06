import {Role} from "./role";

export interface User {
  id?: string,
  username?: string ,
  fullName?: string ,
  password?: string ,
  confirmPassword?: string ,
  numberPhone?:string,
  roles?: [Role],
  enabled?: string ,
  avatar?: string,
  email?: string,
  address?: string,
  createAt?: string,
  action?: string,
  status?: string,
}
