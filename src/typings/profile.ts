export type ProfileStored = {
  displayName: string;
  username: string;
  uid: string;
  description?: string;
  email: string;
  imageUrl?: string;
  coverUrl?: string;
};

export type PutProfileByIdPayload = {
  displayName: string;
  username?: string;
  description?: string;
  email: string;
  imageUrl?: string;
  coverUrl?: string;
};

export type ProfileStoredResponse = {
  data: ProfileStored;
  message: string;
  status: number;
  query: any;
};
