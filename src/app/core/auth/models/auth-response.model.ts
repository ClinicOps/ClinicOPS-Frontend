import { UserDTO } from './user-dto.model';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDTO;
}
