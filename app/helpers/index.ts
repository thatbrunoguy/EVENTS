export const computeDateTime = (date: any, time: any) => {
  const dateString = date.toISOString().split("T")[0];
  const dateTimeString = `${dateString}T${time}`;
  return dateTimeString;
};
