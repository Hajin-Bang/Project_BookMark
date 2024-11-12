export interface UserData {
  uid: string;
  email: string;
  nickname: string;
  isSeller: boolean;
  accessToken?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpFormValues {
  email: string;
  password: string;
  nickname: string;
  isSeller: boolean;
}
