import axios from "axios";
import toast from "react-hot-toast";
import { getData, storeData } from "./localstorage";
import { EVENTSPARROT_USER } from "../constants";

const APP_KEY = process.env.NEXT_PUBLIC_X_APP_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const authFunctions = {
  register: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, data, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "X-APP-KEY": APP_KEY,
        },
      });
      console.log("response", response);
      if (response.data && response.data.status === true) {
        toast.success(response.data.message);
        console.log("res", response?.data.message);
        storeData(EVENTSPARROT_USER, response.data.data);
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
  verifyOTP: async (data) => {
    const TOKEN = getData("eventsparrot-user")?.token;
    try {
      const response = await axios.post(`${BASE_URL}/email/verify`, data, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "X-APP-KEY": APP_KEY,
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      console.log("response", response);
      if (response.data && response.data.status === true) {
        toast.success("Email Verification Complete");
        console.log("res", response?.data.message);
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
  resendOTP: async (data) => {
    const TOKEN = getData("eventsparrot-user")?.token;
    try {
      const response = await axios.get(`${BASE_URL}/email/verify/resend`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "X-APP-KEY": APP_KEY,
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      console.log("response", response);
      if (response.data && response.data.status === true) {
        toast.success(response.data.message);
        console.log("res", response?.data.message);
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
