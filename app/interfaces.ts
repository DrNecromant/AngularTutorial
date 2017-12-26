export interface Note {
  _id?: string;
  text: string;
  created: Date;
}

export interface Section {
  _id?: string;
  title: string;
}

export class User {
  name:string;
  password: string;
  password2: string;
  subscribe: boolean;
  email: string;
  dateOfBirth: string;
  country: string;
  town: string;
}

export class LoginUser {
    userName: string;
    password?: string;
}
