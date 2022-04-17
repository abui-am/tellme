export type SignUpPayload = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  displayName: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export interface User {
  emailVerified: boolean;
  email: string;
  username: string;
  uid: string;
  displayName: string;
}

export interface PostLoginData {
  token: string;
  refreshToken: string;
  user: User;
}

export interface LoginResponse {
  data: PostLoginData;
  message: string;
  status: string;
  query: Record<string, string>;
}

export interface SignUpWithGoogle {
  idToken: string;
  refreshToken: string;
  username: string;
}
