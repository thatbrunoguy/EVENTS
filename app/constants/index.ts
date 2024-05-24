export const EVENTSPARROT_USER = "eventsparrot-user";
export const EVENTSPARROT_ADMIN = "eventsparrot-admin";

export const adminStatus: { [key: number]: string } = {
  1: "new",
  2: "start",
  4: "end",
  3: "blocked",
};

export const payoutStatus: { [key: number]: string } = {
  1: "new",
  2: "paid",
  3: "blocked",
};

/**
 * @param {string} text text string to be truncated
 * @param {number} cutOff number of characters before truncating
 * @returns string
 */
export const truncateText = (text: string, cutOff: number) => {
  return text?.length >= cutOff ? `${text?.substring(0, cutOff)}...` : text;
};
