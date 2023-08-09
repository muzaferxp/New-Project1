//UTC date input
export const ddmmyyyyFormat = (dateString: string): string => {
  const dd = dateString.split("/")[1];
  const mm = dateString.split("/")[0];
  const ddmmyyyy = dd + "/" + mm + "/" + dateString.split("/")[2];

  return ddmmyyyy;
};

export const getDateInCalcuttaTimeZone = (date: Date): string => {
  return date.toLocaleString(undefined, {
    timeZone: "Asia/Calcutta",
  });
};
