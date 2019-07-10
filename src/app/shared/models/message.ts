export interface IMessage {
  id: string;
  roomId: string;
  type: string;
  timestamp: number;
  text?: string;
  sender: string;
  receiver: string;
  audio?: IAudio;
  image?: IImage;
}

 export interface IAudio {
   audio_url: string;
   audio_duration: number;
 }
 export interface IImage {
   image_url: string;
   caption?: string;
 }
