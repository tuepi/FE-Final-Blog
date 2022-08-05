import {Role} from "./role";

export interface User {
  id?: string;
  username?: string;
  fullName?: string;
  password?: string;
  confirmPassword?: string;
  phone?:string;
  roles?: [Role];
  enabled?: string;
}
