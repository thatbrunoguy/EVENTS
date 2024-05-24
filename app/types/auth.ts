export type Login = {
  email: string;
  password: string;
  invite?: string;
};

export type Register = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  invite?: string;
};

export type AccountInfo = {
  id: string;
  name: string;
  avatar: string;
  avatar_thumb: string;
  country: string;
  currency: string;
  balance: number;
  available_payout: number;
  created_at: string;
  events_count: number;
  owner: [];
  members: [];
};
