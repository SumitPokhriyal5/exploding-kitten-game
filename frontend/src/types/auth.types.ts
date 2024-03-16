export interface ILoginUser {
    id: string,
    name: string,
    token: string,
}

export interface IUserLogin {
    email : string,
    password : string
}

export interface IUserSignup {
    name : string,
    email : string,
    password : string
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    points: number;
    __v: number;
  }