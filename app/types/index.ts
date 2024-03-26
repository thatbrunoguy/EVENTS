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
