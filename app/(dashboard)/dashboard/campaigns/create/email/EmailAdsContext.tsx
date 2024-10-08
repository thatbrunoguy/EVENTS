import { eventsManagamentFunctions } from "@/app/utils/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useState } from "react";
import { EventData } from "../../../event/page";
import { formatDate, formatTime } from "@/app/helpers";
import { campaignFn } from "@/app/utils/endpoints/campaign";
import { toast } from "react-hot-toast";

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
  selectedEvent: {
    img: string;
    desc: string;
    name: string;
    startDate: string;
    id: string;
    address?: string;
  };
  setSelectedEvent: any;
  events: any;
  quillValue: string;
  setQuillValue: (value: any) => void;
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
  selectedEvent: {
    img: "",
    desc: "",
    name: "",
    startDate: "",
    id: "",
    address: "",
  },
  setSelectedEvent: () => {},
  events: null,
  quillValue: "",
  setQuillValue: () => {},
};

export const EmailAdContext = createContext<DProps>(defaultValue);

type IProps = {
  children: ReactNode;
};

export const EmailAdContextProvider = ({ children }: IProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

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

  const [quillValue, setQuillValue] = useState("Email header");

  const goBack = () => {
    router.push("/dashboard/campaigns");
  };

  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: () => eventsManagamentFunctions.getEvents(1 as any),
    select: (data) => {
      const selectedEvents = data?.events?.map((event: EventData) => {
        const startDate = event.start_date
          ? `${formatDate(event.start_date)} | ${formatTime(event.start_date)}`
          : null;

        const desc = event.tickets[0]?.description || null;
        const img = event.medias[0]?.original || null;
        const address = event.locations[0]?.address || "Online";
        const status = event.status;

        return {
          id: event.id || null,
          name: event.name || null,
          startDate,
          desc,
          img,
          address,
          status,
        };
      });

      return selectedEvents;
    },
  });

  const [selectedEvent, setSelectedEvent] = useState(events && events[0]);

  const isComplete =
    !!data.from_email &&
    !!data.html_content &&
    !!data.name &&
    !!data.reply_to_email &&
    !!data.subject &&
    mailContent.selectedEvents.length > 0 &&
    quillValue !== "Email Header" &&
    !!selectedEvent;

  const createEmailCamp = useMutation({
    mutationFn: campaignFn.createEmailCampaign,
    onError: async (error: string, variables, context) => {
      toast.error(error);
    },
    onSuccess: async (data, variables, context) => {
      // Boom baby!
      toast.success(data);
      router.push("/dashboard/campaigns");
    },
  });

  const createEmailCampaign = () => {
    const newData = { ...data, from_name: data.name };
    createEmailCamp.mutate({ eventId: selectedEvent.id, body: newData });
    queryClient.invalidateQueries({ queryKey: ["ad-campaign"] });
  };

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
        selectedEvent,
        setSelectedEvent,
        events,
        quillValue,
        setQuillValue,
      }}
    >
      {children}
    </EmailAdContext.Provider>
  );
};
