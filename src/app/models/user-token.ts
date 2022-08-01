import {Role} from "./role";

export interface UserToken {
  id?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  accessToken?: string;
  enabled?: boolean;
  roles?: Role[];
}
