import { UserInfoDTO } from "../user/userInfoDTO.model";

export interface LoginDTO extends Pick<UserInfoDTO, 'email'|'password'> {}