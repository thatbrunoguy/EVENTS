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
      throw error;
    }
  },

  //verify cac
  verifyCac: async (cac) => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    try {
      const response = await axios.post(`${BASE_URL}/kyc/business`, cac, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "X-APP-KEY": APP_KEY,
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      if (response.data && response.data.status === true) {
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw error;
    }
  },

  //get banks
  getBanks: async () => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    try {
      const response = await axios.get(
        `${BASE_URL}/payment/banks?perPage=100&next=YmFuazozMjI=`,
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

  //get single bank
  getBank: async (data) => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    try {
      const response = await axios.get(
        `${BASE_URL}/payment/bank-details?bank_code=${data.bank_code}&account_number=${data.account_number}`,
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

  //save user bank
  saveBankDetails: async (data) => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    const accountId = getData(EVENTSPARROT_USER)?.account?.id;
    try {
      const response = await axios.post(
        `${BASE_URL}/account/${accountId}/bank`,
        {
          bank_code: data.bank_code,
          bank_name: data.bank_name,
          account_number: data.account_number,
        },
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
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
      toast.error(error.response.data.message);
      throw error;
    }
  },
};
