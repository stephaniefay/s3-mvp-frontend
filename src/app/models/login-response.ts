export interface LoginResponse {
  token: string | undefined;
  error: string | undefined;
}

export interface RegisterResponse {
  id: string;
  nickname: string;
  email: string;
  token: string | undefined;
}
