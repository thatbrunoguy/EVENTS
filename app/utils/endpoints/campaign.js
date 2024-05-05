import { EVENTSPARROT_USER } from "@/app/constants";
import axios from "axios";
import { getData } from "../localstorage";
import { toast } from "react-hot-toast";

const APP_KEY = process.env.NEXT_PUBLIC_X_APP_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const campaignFn = {
  buyToken: async ({ token_qty }) => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    const accountId = getData(EVENTSPARROT_USER)?.account?.id;
    try {
      const response = await axios.get(
        `${BASE_URL}/payment/${accountId}/token?token_qty=${token_qty}`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "X-APP-KEY": APP_KEY,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      console.log("response", response);
      if (response.data && response.data.status === true) {
        window.location.replace(response.data.data.redirect.url);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.response.data.message);
      // toast.error(error.response.data.message);
      throw error;
    }
  },
  createAdsCampaign: async ({ eventId, body }) => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    try {
      const response = await axios.post(
        `${BASE_URL}/event/${eventId}/ads-campaign`,
        body,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "X-APP-KEY": APP_KEY,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      if (response.data && response.data.status === true) {
        return response.data.message;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      return error.response.data.message;
    }
  },
  createEmailCampaign: async ({ eventId, body }) => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    try {
      const response = await axios.post(
        `${BASE_URL}/event/${eventId}/email-campaign`,
        body,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "X-APP-KEY": APP_KEY,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      if (response.data && response.data.status === true) {
        return response.data.message;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      return error.response.data.message;
    }
  },
  getAdsCampaign: async () => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    const activeEventId = getData(EVENTSPARROT_USER)?.activeEvent?.id;

    try {
      const response = await axios.get(
        `${BASE_URL}/event/${activeEventId}/ads-campaign `,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "X-APP-KEY": APP_KEY,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      if (response.data && response.data.status === true) {
        return response?.data?.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching campaign:", error.response.data.message);
      return error.response.data;
    }
  },
  getEmailCampaigns: async () => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    const activeEventId = getData(EVENTSPARROT_USER)?.activeEvent?.id;

    try {
      const response = await axios.get(
        `${BASE_URL}/event/${activeEventId}/email-campaign `,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "X-APP-KEY": APP_KEY,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      if (response.data && response.data.status === true) {
        return response?.data?.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching campaign:", error.response.data.message);
      return error.response.data;
    }
  },
  getAdCampaignsAnalytics: async ({}) => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    const activeEventId = getData(EVENTSPARROT_USER)?.activeEvent?.id;

    try {
      const response = await axios.get(
        `${BASE_URL}/event/${activeEventId}/adsCampaign/analytics`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "X-APP-KEY": APP_KEY,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      if (response.data && response.data.status === true) {
        return response?.data?.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching campaign:", error.response.data.message);
      return error.response.data;
    }
  },

  getEmailCampaignsAnalytics: async ({}) => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    const activeEventId = getData(EVENTSPARROT_USER)?.activeEvent?.id;

    try {
      const response = await axios.get(
        `${BASE_URL}/event/${activeEventId}/emailCampaign/analytics`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "X-APP-KEY": APP_KEY,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      if (response.data && response.data.status === true) {
        return response?.data?.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching campaign:", error.response.data.message);
      return error.response.data;
    }
  },
};
