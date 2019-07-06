import {IUser} from '@ec-shared/models/users';

export interface IRoom {
  id: string;
  participants: IUser[];
}
