import axios, { AxiosResponse } from "axios";
import { getData } from "../utils/localstorage";
import moment from "moment";
export const computeDateTime = (date: any, time: any) => {
  const dateString = date.toISOString().split("T")[0];
  const dateTimeString = `${dateString}T${time}`;
  return dateTimeString;
};

const APP_KEY = process.env.NEXT_PUBLIC_X_APP_KEY;

export const uploadImage = async (uploadURL: string, file: File) => {
  const TOKEN = getData("eventsparrot-user")?.token;

  try {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        const arrayBuffer = reader.result as ArrayBuffer;

        try {
          const response: AxiosResponse<any> = await axios.put(
            uploadURL,
            arrayBuffer,
            {
              headers: {
                "Content-Type": file.type,
                "X-APP-KEY": APP_KEY,
                // Authorization: `Bearer ${TOKEN}`,
              },
            }
          );

          console.log("Upload successful:", response.data);
          resolve(response.data);
        } catch (error) {
          console.error("Error uploading image:", error);
          reject(error);
        }
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export function extractUrlBeforeQueryString(url: string) {
  const parts = url.split("?");
  return parts[0];
}

export function formatDate(inputDate: string) {
  return moment(inputDate).format("Do MMMM YYYY");
}
export function formatTime(inputDate: string) {
  return moment(inputDate).format("h:mma");
}

export const addLinkStyling = (htmlString: any) => {
  // Regular expression to match anchor tags without "href" attribute
  const anchorRegex = /<a\s+(?!.*?\bhref\b)[^>]*>(.*?)<\/a>/gi;

  // Wrap matched anchor tags with "href" attribute
  return htmlString.replace(anchorRegex, '<a href="#" target="_blank">$1</a>');
};
