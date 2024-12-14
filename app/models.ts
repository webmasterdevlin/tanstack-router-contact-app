export type Contact = {
  id: string;
  first: string | null;
  last: string | null;
  createdAt: Date;
  favorite: boolean | null;
  avatar: string | null;
  twitter: string | null;
  notes: string | null;
};
