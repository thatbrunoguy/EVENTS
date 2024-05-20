export const EVENTSPARROT_USER = "eventsparrot-user";
export const EVENTSPARROT_ADMIN = "eventsparrot-admin";

/**
 * @param {string} text text string to be truncated
 * @param {number} cutOff number of characters before truncating
 * @returns string
 */
export const truncateText = (text: string, cutOff: number) => {
  return text?.length >= cutOff ? `${text?.substring(0, cutOff)}...` : text;
};
