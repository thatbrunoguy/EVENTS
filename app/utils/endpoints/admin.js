import axios from "axios";

import toast from "react-hot-toast";
import { getData } from "../localstorage";
import { EVENTSPARROT_ADMIN } from "@/app/constants";

const APP_KEY = process.env.NEXT_PUBLIC_X_APP_KEY;
const ADMIN_BASE_URL = process.env.NEXT_PUBLIC_ADMIN_BASE_URL || "";

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
    if (token) {
      config.headers["Authorization"] = `Bearer ${TOKEN}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const adsFn = {
  getCampaigns: async () => {
    const TOKEN = getData(EVENTSPARROT_ADMIN)?.token;
    try {
      const response = await axios.get(`${ADMIN_BASE_URL}/adsCampaign`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "X-APP-KEY": APP_KEY,
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      if (response.data && response.data.status === true) {
        toast.success(response.data.message);
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.response.data.message);
      toast.error(error.response.data.message);
      throw error;
    }
  },
};

export const payoutFn = {
  getCampaigns: async () => {
    const TOKEN = getData(EVENTSPARROT_ADMIN)?.token;
    try {
      const response = await axios.get(`${ADMIN_BASE_URL}/payouts`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "X-APP-KEY": APP_KEY,
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      console.log("response", response);
      if (response.data && response.data.status === true) {
        toast.success(response.data.message);
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.response.data.message);
      toast.error(error.response.data.message);
      throw error;
    }
  },
};
