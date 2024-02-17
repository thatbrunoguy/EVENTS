import axios, { AxiosResponse } from "axios";

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
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
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
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
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
  getUserAccount: async () => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    try {
      const response = await axios.get(`${BASE_URL}/account`, {
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

export const uploadImageFunctions = {
  getInitialURL: async (imageName) => {
    console.log("ImageNmae::: ", imageName);
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    try {
      const response = await axios.get(
        `${BASE_URL}/media-upload-url/${imageName}`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "X-APP-KEY": APP_KEY,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      console.log("response", response);
      if (response.data && response.status === 200) {
        console.log("res", response?.data);
        return response.data;
      } else {
        throw new Error(response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error.response.status);
      throw error;
    }
  },
};

export const eventsManagamentFunctions = {
  createEvent: async (data) => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    const accountId = getData(EVENTSPARROT_USER)?.account?.id;
    console.log("userAccountId", accountId);
    try {
      const response = await axios.post(
        `${BASE_URL}/account/${accountId}/event`,
        data.data,
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
  getCategories: async () => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    try {
      const response = await axios.get(
        `${BASE_URL}/events-category?perPage=20 `,
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
  getEvents: async () => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    const accountId = getData(EVENTSPARROT_USER)?.account?.id;

    try {
      const response = await axios.get(
        `${BASE_URL}/account/${accountId}/event `,
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
        // toast.success(response.data.message);
        console.log("res", response?.data.message);
        return response.data.data.events;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.response.data.message);
      // toast.error(error.response.data.message);
      throw error;
    }
  },
  toggleEventStatus: async ({ status, eventId }) => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    const accountId = getData(EVENTSPARROT_USER)?.account?.id;

    try {
      const response = await axios.put(
        `${BASE_URL}/account/${accountId}/event/${eventId} `,
        { status: status === 1 ? 2 : 1 },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "X-APP-KEY": APP_KEY,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      console.log("response-set-inactive", response);
      if (response.data && response.data.status === true) {
        toast.success(
          `Event has been set to ${status === 1 ? "Inactive" : "Active"}`
        );
        console.log("res", response?.data.message);
        return response.data.data.events;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.response.data.message);
      // toast.error(error.response.data.message);
      throw error;
    }
  },

  deleteEvent: async ({ eventId }) => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    const accountId = getData(EVENTSPARROT_USER)?.account?.id;

    try {
      const response = await axios.delete(
        `${BASE_URL}/account/${accountId}/event/${eventId} `,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "X-APP-KEY": APP_KEY,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      console.log("response-delete-event", response);
      if (response.data && response.data.status === true) {
        toast.success("Event deleted successfully!!");
        console.log("res", response?.data.message);
        return response.data.data.events;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.response.data.message);
      // toast.error(error.response.data.message);
      throw error;
    }
  },

  getEventSales: async (eventId) => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    const accountId = getData(EVENTSPARROT_USER)?.account?.id;

    try {
      const response = await axios.get(`${BASE_URL}/event/${eventId}/order`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "X-APP-KEY": APP_KEY,
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      console.log("response - orders", response);
      if (response?.data && response?.data?.status === true) {
        toast.success(response?.data?.message);
        console.log("res", response?.data.message);
        return response?.data?.data?.orders;
      } else {
        throw new Error(response?.data?.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.response?.data?.message);
      // toast.error(error.response.data.message);
      throw error;
    }
  },
  getEventSalesAnalytics: async (eventId) => {
    const TOKEN = getData(EVENTSPARROT_USER)?.token;
    const accountId = getData(EVENTSPARROT_USER)?.account?.id;

    try {
      const response = await axios.get(`${BASE_URL}/event/${eventId}/sales`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "X-APP-KEY": APP_KEY,
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      console.log("response - orders", response);
      if (response?.data && response?.data?.status === true) {
        toast.success(response?.data?.message);
        console.log("res", response?.data.message);
        return response?.data?.data;
      } else {
        throw new Error(response?.data?.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.response?.data?.message);
      // toast.error(error.response.data.message);
      throw error;
    }
  },
};

export const guestFunctions = {
  getEvents: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/events`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "X-APP-KEY": APP_KEY,
        },
      });
      console.log("response", response);
      if (response.data && response.data.status === true) {
        // toast.success(response.data.message);
        console.log("res", response?.data.message);
        return response.data.data.events;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.response.data.message);
      // toast.error(error.response.data.message);
      throw error;
    }
  },
  getEventsById: async (eventId) => {
    try {
      const response = await axios.get(`${BASE_URL}/events/${eventId}`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "X-APP-KEY": APP_KEY,
        },
      });
      console.log("response", response);
      if (response.data && response.data.status === true) {
        // toast.success(response.data.message);
        console.log("res", response?.data.message);
        return response.data.data.event;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.response.data.message);
      // toast.error(error.response.data.message);
      throw error;
    }
  },

  bookEvent: async ({ myData, eventId }) => {
    console.log("data", myData);
    console.log("eventId", myData);
    try {
      const response = await axios.post(
        `${BASE_URL}/events/${eventId}/order`,
        myData,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "X-APP-KEY": APP_KEY,
          },
        }
      );
      console.log("response", response.data.data);
      if (response) {
        // toast.success(response.data.message);
        return response.data.data.url;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", "wrong");
      // toast.error(error.response.data.message);
      throw error;
    }
  },

  getEventByCategories: async (category) => {
    try {
      const response = await axios.get(`${BASE_URL}/events?=${category}`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "X-APP-KEY": APP_KEY,
        },
      });
      console.log("response", response);
      if (response.data && response.data.status === true) {
        // toast.success(response.data.message);
        console.log("res", response?.data.message);
        return response.data.data.events;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.response.data.message);
      // toast.error(error.response.data.message);
      throw error;
    }
  },
};
