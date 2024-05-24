import axios, { AxiosResponse } from "axios";
import { getData } from "../utils/localstorage";
import moment from "moment";
export const computeDateTime = (date: any, time: any) => {
  const dateString = moment(date).format("YYYY-MM-DD");
  const dateTimeString = moment(`${dateString}T${time}`).toISOString();
  return dateTimeString;
};
// export const computeDateTime = (date: any, time: any) => {
//   const formattedDate = moment(date).add(1, "days").format("YYYY-MM-DD");
//   const dateTimeString = moment(`${formattedDate}T${time}`).toISOString();
//   return dateTimeString;
// };

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

          // console.log("Upload successful:", response.data);
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

export function formatDate2(inputDate: string) {
  const date = moment(inputDate);
  const formattedDate = date.format("ddd, MMM Do YYYY");
  return formattedDate;
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

export const formatDateTime = (dateString: any): string => {
  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear();
  const month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
  const day = ("0" + dateObject.getDate()).slice(-2);
  const hours = ("0" + dateObject.getHours()).slice(-2);
  const minutes = ("0" + dateObject.getMinutes()).slice(-2);

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formattedDate;
};
