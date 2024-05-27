import axios from "axios";

import toast from "react-hot-toast";
import { getData } from "../localstorage";
import { EVENTSPARROT_ADMIN } from "@/app/constants";

const APP_KEY = process.env.NEXT_ADMIN_PUBLIC_X_APP_KEY;
const ADMIN_BASE_URL = process.env.NEXT_PUBLIC_ADMIN_X_APP_KEY || "";

const axiosInstance = axios.create({
  baseURL: ADMIN_BASE_URL,
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    "X-APP-KEY": APP_KEY,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const TOKEN = getData(EVENTSPARROT_ADMIN)?.token;
    if (TOKEN) {
      config.headers["Authorization"] = `Bearer ${TOKEN}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const adsFn = {
  getCampaigns: async (filter) => {
    try {
      const response = await axiosInstance.get(
        `${ADMIN_BASE_URL}/adsCampaign`,
        {
          params: filter,
        }
      );
      if (response.data && response.data.status === true) {
        toast.success(response.data.message);
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  //update the status  of the campaign
  updateCampaign: async ({ campaignId, status }) => {
    try {
      const response = await axiosInstance.put(
        `${ADMIN_BASE_URL}/adsCampaign/${campaignId}`,
        { status }
      );
      if (response.data && response.data.status === true) {
        toast.success(response.data.message);
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
};

export const payoutFn = {
  //get all payouts
  getAllPayOut: async (filter) => {
    try {
      const response = await axiosInstance.get(`${ADMIN_BASE_URL}/payouts`, {
        params: filter,
      });
      if (response.data && response.data.status === true) {
        toast.success(response.data.message);
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },

  //update the status  of the payout
  updatePayout: async ({ payoutId, status }) => {
    try {
      const response = await axiosInstance.put(
        `${ADMIN_BASE_URL}/payouts/${payoutId}`,
        { status }
      );
      if (response.data && response.data.status === true) {
        toast.success(response.data.message);
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
};
