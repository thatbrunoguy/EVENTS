export * from "./auth";

export type OrganizerType = {
  name: string;
  phone: string;
};
export type LocationDetailsType = {
  address: string;
  latitude: string;
  longitude: string;
};

export type RequirementType = {
  name: string;
  required: boolean;
  title: string;
};

export type FaqType = {
  question: string;
  answer: string;
};

export type EventInfoType = {
  organizer: OrganizerType;
  name: string;
  description: string;
  location_type: number;
  location_details: LocationDetailsType;
  start_date: string;
  end_date: string;
  timezone: string;
  categories: [string];
  registration_requirements: RequirementType[];
  medias: string[];
  faqs: FaqType[];
  tickets: [];
  slug: string;
};

export type Ticket = {
  id: string;
  event_id: string;
  name: string;
  description: string;
  price: number;
  stock: string;
  stock_qty: number;
  purchase_limit: number;
  quantity_limit_per_person: number | null;
  currency: string;
  type: number;
  status: number;
  created_at: string;
  updated_at: string;
};

export type Media = {
  original: string;
  thumb: string;
};

export type Location = {
  id: string;
  event_id: string;
  type: number;
  latitude: string;
  longitude: string;
  country_code: string | null;
  country: string | null;
  city: string | null;
  zipcode: string | null;
  address: string;
  link: string | null;
  meta: any | null;
  status: number;
  created_at: string;
  updated_at: string;
};
