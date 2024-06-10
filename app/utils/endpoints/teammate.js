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

export const teammateFn = {
  getTeammates: async () => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    const accountId = getData(EVENTSPARROT_USER)?.account?.id;
    try {
      const response = await axios.get(
        `${BASE_URL}/account/${accountId}/team`,
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
      toast.success(error.response.data.message);
      throw error;
    }
  },

  //invite user
  inviteUser: async (body) => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    const accountId = getData(EVENTSPARROT_USER)?.account?.id;
    try {
      const response = await axios.post(
        `${BASE_URL}/account/${accountId}/invite`,
        body,
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
        toast.success(response.data.message);
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      toast.success(error.response.data.message);
      throw error;
    }
  },

  //accept invite
  acceptInvite: async (inviteId, body) => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    const accountId = getData(EVENTSPARROT_USER)?.account?.id;
    try {
      const response = await axios.post(
        `${BASE_URL}/account/${accountId}/invite/${inviteId}`,
        body,
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
        toast.success(response.data.message);
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      toast.success(error.response.data.message);
      throw error;
    }
  },

  //delete teammate invite
  deleteMember: async (teamId) => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    const accountId = getData(EVENTSPARROT_USER)?.account?.id;
    try {
      const response = await axios.delete(
        `${BASE_URL}/account/${accountId}/team/${teamId}`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "X-APP-KEY": APP_KEY,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      if (response.data && response.data.status === true) {
        toast.success(response.data.message);
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      toast.success(error.response.data.message);
      throw error;
    }
  },
};
