import { ReactNode, createContext, useState } from "react";

type DProps = {
  setData: (value: any) => void;
  data: {
    name: string;
    subject: string;
    from_email: string;
    reply_to_email: string;
    html_content: any;
  };
  mailContent: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    facebookLink: string;
    instagramLink: string;
    xLink: string;
    linkedinLink: string;
    tiktokLink: string;
    youtubeLink: string;
    selectedEvents: Array<Object>;
  };
  setMailContent: (value: any) => void;
};

const defaultValue: DProps = {
  setData: () => {},
  data: {
    name: "",
    subject: "",
    from_email: "",
    reply_to_email: "",
    html_content: null,
  },
  mailContent: {
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    facebookLink: "",
    instagramLink: "",
    xLink: "",
    linkedinLink: "",
    tiktokLink: "",
    youtubeLink: "",
    selectedEvents: [],
  },
  setMailContent: () => {},
};

export const EmailAdContext = createContext<DProps>(defaultValue);

type IProps = {
  children: ReactNode;
};

export const EmailAdContextProvider = ({ children }: IProps) => {
  const [data, setData] = useState({
    name: "Campaign Name",
    subject: "",
    from_email: "",
    reply_to_email: "",
    html_content: null,
  });

  const [mailContent, setMailContent] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    facebookLink: "",
    instagramLink: "",
    xLink: "",
    linkedinLink: "",
    tiktokLink: "",
    youtubeLink: "",
    selectedEvents: [],
  });

  return (
    <EmailAdContext.Provider
      value={{ data, setData, mailContent, setMailContent }}
    >
      {children}
    </EmailAdContext.Provider>
  );
};
