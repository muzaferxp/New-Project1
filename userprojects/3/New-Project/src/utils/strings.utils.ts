export const toTitleCase = (str: string) => {
  return str
    .replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
    .trim();
};

export const stringToStringArray = async (str: string): Promise<string[]> => {
  const strsArray = str.split(",");
  let numbersArray = await strsArray.map((str) => {
    return str;
  });
  return numbersArray;
};

export const splitSms = async (message: string, smsSize: number): Promise<string[]> => {
  let start = 0;
  let end = smsSize;
  let splitedSms: string[] = [];
  while (message.length > smsSize) {
    let smsSubString = message.slice(start, end);
    splitedSms.push(smsSubString);
    start += smsSize;
    end += smsSize;
  }
  return splitedSms;
}

export const replaceAll = (str:string, oldStr:string, replaceStr:string) => {
  // If a regex pattern
  if (
    Object.prototype.toString.call(oldStr).toLowerCase() === "[object regexp]"
  ) {
    return str.replace(str, replaceStr);
  }

  // If a string
  return str.replace(new RegExp(oldStr, "g"), replaceStr);
};