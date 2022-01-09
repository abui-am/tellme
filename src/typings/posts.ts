export interface CreatedAt {
  _seconds: number;
  _nanoseconds: number;
}

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
