export type ProfileStored = {
  displayName: string;
  username: string;
  uid: string;
  email: string;
  imageUrl?: string;
  coverUrl?: string;
};

export type PutProfileByIdPayload = {
  description: string;
  displayName: string;
  username: string;
};
