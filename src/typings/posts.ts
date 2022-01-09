import { firestore } from 'firebase';
export type CreatedAt = firestore.Timestamp;

export interface Comment {
  sender: Sender;
  createdAt: CreatedAt;
  comment: string;
}

export interface Sender {
  profileId: string;
  type: string;
  name: string;
}

export interface Image {
  type: string;
  url: string;
}

export interface Data {
  id: string;
  comments: Comment[];
  createdAt: CreatedAt;
  message: string;
  sender: Sender;
  isDeleted: boolean;
  image: Image;
  profileId: string;
}

export interface Posts {
  data: Data[];
  message: string;
  status: number;
  query: any;
}

export type CreatePostPayload = Partial<Pick<Data, 'image' | 'sender' | 'message' | 'profileId'>>;
