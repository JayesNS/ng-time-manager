import { User, AuthResponse } from '../models';

export interface AuthState {
  user: User;
  authStatus: AuthResponse;
}
