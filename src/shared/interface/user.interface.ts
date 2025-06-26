export interface IUser {
  _id: string;
  uid: string;
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  role: "user" | "admin";
  createdAt?: string;
  updatedAt?: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

// auth.interface.ts
export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: IUser;
}
