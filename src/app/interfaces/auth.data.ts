export interface UserLogin {
  email: string;
  password: string;
}

export interface AuthRes {
  success: boolean;
  message: string;
  token: string;
}
