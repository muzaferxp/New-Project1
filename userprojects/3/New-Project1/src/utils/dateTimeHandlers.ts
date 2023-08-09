import moment from "moment";

export const getStartEndDateTimeFromDateString = (
  startDate = "",
  endDate = "",
  interval?: number
) => {
  let startDateTime = getIndianCurrentTime();
  let endDateTime = getIndianCurrentTime();
  if (startDate && endDate) {
    startDateTime = new Date(startDate);
    endDateTime = new Date(endDate);
  } else if (startDate && !endDate) {
    startDateTime = new Date(startDate);
    endDateTime = new Date(startDateTime);
    if (interval) endDateTime.setDate(endDateTime.getDate() + interval);
    else endDateTime.setDate(getIndianCurrentTime().getDate());
  } else if (endDate && !startDate) {
    endDateTime = new Date(endDate);
    startDateTime = new Date(endDateTime);
    if (interval) startDateTime.setDate(startDateTime.getDate() + interval);
    else endDateTime.setDate(getIndianCurrentTime().getDate());
  } else {
    startDateTime = getIndianCurrentTime();
    endDateTime = new Date(startDateTime);
    if (interval) endDateTime.setDate(endDateTime.getDate() + interval);
    else endDateTime.setDate(getIndianCurrentTime().getDate());
  }
  return { startDateTime, endDateTime };
};



export const getDbMatchISO = (dateTime: Date) => {
  return (
    dateTime.toISOString().split("T")[0] + " " + dateTime.toLocaleTimeString()
  );
};
export const getTime = (dateTime: string) => {
  const dateTimeObj = new Date(dateTime);
  return `${dateTimeObj.getHours()}:${dateTimeObj.getMinutes()}:${dateTimeObj.getSeconds()}`;
};

export const isCurrentDate = (dateTime: Date) => {
  var inputDate = new Date(dateTime);
  var todaysDate = getIndianCurrentTime();
  // call setHours to take the time out of the comparison
  if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
    return true;
  }
  return false;
};

export const getIndianCurrentTime = (
  argDateTime = new Date(),
  force = false
) => {
  const dateTime = new Date(argDateTime);
  if (
    !force &&
    Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Calcutta"
  )
    return dateTime;
  dateTime.setHours(dateTime.getHours() + 5);
  dateTime.setMinutes(dateTime.getMinutes() + 30);
  return dateTime;
};

export const getIndianCurrentTimev2 = (
  argDateTime = new Date(),
) => {
  moment.locale();
  const dateTime = moment(new Date(argDateTime)).utcOffset("+05:30")
  return dateTime;
};


export const getDateDifference = (date1 = new Date(), date2 = new Date()) => {
  // @ts-ignore
  return parseInt((date1 - date2) / (1000 * 60 * 60 * 24), 10);
};

/**
 *
 * @param date date string
 * @returns start and end date object if provided, else it will todaysdate
 */
export const getStartAndEndTimeOfDate = (
  date?: string
): { start: Date; end: Date } => {
  const start = date ? new Date(date) : new Date();
  const end = date ? new Date(date) : new Date(start);
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  return { start, end };
};

export const getFormattedDate = (date = new Date()) => {
  const dateString = date.toISOString().split("T")[0];
  const splits = dateString.split("-");
  return `${splits[2]}-${splits[1]}-${splits[0]}`;
};
