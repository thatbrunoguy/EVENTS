import { useRouter } from "next/navigation";
import { ReactNode, createContext, useState } from "react";

type EventObj = {
  img: string;
  address: string;
  name: string;
  startDate: string;
  id: string;
};

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
    selectedEvents: EventObj[];
    organizersName: string;
    emailHeader: string;
    emailDescription: string;
    media: string[];
  };
  setMailContent: (value: any) => void;
  createEmailCampaign: () => void;
  isComplete: boolean;
  goBack: () => void;
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
    organizersName: "",
    emailHeader: "",
    emailDescription: "",
    media: [],
  },
  setMailContent: () => {},
  createEmailCampaign: () => {},
  isComplete: false,
  goBack: () => {},
};

export const EmailAdContext = createContext<DProps>(defaultValue);

type IProps = {
  children: ReactNode;
};

export const EmailAdContextProvider = ({ children }: IProps) => {
  const router = useRouter();
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
    organizersName: "",
    emailHeader: "Email Header",
    emailDescription:
      "  Don't miss out! Fill in the email below with a captivating description of these must-attend events.",
    media: [],
  });

  const createEmailCampaign = () => {
    console.log("data", data);
  };

  const goBack = () => {
    router.push("/dashboard/campaigns");
  };

  const isComplete =
    !!data.from_email &&
    !!data.html_content &&
    !!data.name &&
    !!data.reply_to_email &&
    !!data.subject &&
    mailContent.selectedEvents.length > 0 &&
    mailContent.emailHeader !== "Email Header";

  return (
    <EmailAdContext.Provider
      value={{
        data,
        setData,
        mailContent,
        setMailContent,
        createEmailCampaign,
        isComplete,
        goBack,
      }}
    >
      {children}
    </EmailAdContext.Provider>
  );
};
