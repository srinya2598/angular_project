export interface IMessage {
  id: string;
  roomId: string[];
  type: string;
  timestamp: number;
  text?: string;
  sender?: ISender;
  user?: IUser;
  audio?: IAudio;
  image?: IImage;
}

export interface ISender {
  id: string;
  full_name: string;
  profile_pic?: string;
}
export interface IUser {
  id: string;
  full_name: string;
  profile_pic?: string;
}
 export interface IAudio {
   audio_url: string;
   audio_duration: number;
 }
 export interface IImage {
   image_url: string;
   caption?: string;
 }
