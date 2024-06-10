import { EVENTSPARROT_USER } from "@/app/constants";
import axios from "axios";
import { getData } from "../localstorage";
import { toast } from "react-hot-toast";

const APP_KEY = process.env.NEXT_PUBLIC_X_APP_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const roles = {
  1: "Admin (Manage everything)",
  2: "Marketing (Manage Ads & Emails)",
  3: "Check-in attendees (Scan, Input & Check in attendees on the event day)",
};

export const payoutFn = {
  getPayouts: async ({ page = 1 }) => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    const accountId = getData(EVENTSPARROT_USER)?.account?.id;
    try {
      const response = await axios.get(
        `${BASE_URL}/account/${accountId}/payout?page=${page}`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "X-APP-KEY": APP_KEY,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      if (response.data && response.data.status === true) {
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      return error;
    }
  },
};
