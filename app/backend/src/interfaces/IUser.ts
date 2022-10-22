import ILogin from './ILogin';

export interface IUser extends ILogin {
  id?: number;
  userName: string;
  role: string;
}
