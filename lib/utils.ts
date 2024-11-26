import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNowStrict } from "date-fns";
import { vi as locale } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatDistanceLocale = {
  lessThanXSeconds: "vừa xong",
  xSeconds: "vừa xong",
  halfAMinute: "vừa xong",
  lessThanXMinutes: "{{count}} phút",
  xMinutes: "{{count}} phút",
  aboutXHours: "{{count}} giờ",
  xHours: "{{count}} giờ",
  xDays: "{{count}} ngày",
  aboutXWeeks: "{{count}} tuần",
  xWeeks: "{{count}} tuần",
  aboutXMonths: "{{count}} tháng",
  xMonths: "{{count}} tháng",
  aboutXYears: "{{count}} năm",
  xYears: "{{count}} năm",
  overXYears: "{{count}} năm",
  almostXYears: "{{count}} năm",
};

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {};

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString());

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "Khoảng " + result;
    } else {
      if (result === "vừa xong") return result;
      return result + " trước";
    }
  }

  return result;
}

export function formatTimeToNow(date: Date | number): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  });
}
