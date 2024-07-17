export interface IUser {
  id: number;
  username: string;
  email: string;
  salt?: string;
  emailVerified: boolean;
  password?: string;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at: string | Date | null;
  comparePassword?: (password: string) => boolean;
}

export interface ISignUpDto {
  username: string;
  email: string;
  password: string;
}

export interface ISignInDto {
  email: string;
  password: string;
}
