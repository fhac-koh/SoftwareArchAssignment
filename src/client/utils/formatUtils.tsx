import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export const utcToJapanTime = (time: string) => {
    const jst = utcToZonedTime(time, "Asia/Tokyo");
    return format(jst, "yyyy/MM/dd HH:mm:ss");
};

export const trimString = (str: string, limit: number, foot: string) => {
    if (str.length > limit) return `${str.slice(0, limit - 1)}${foot}`;
    return str;
};
