// import {
//   format,
//   addHours,
//   formatDistanceToNow,
//   differenceInMinutes,
//   differenceInHours,
//   differenceInMilliseconds,
//   formatRelative,
//   addMinutes,
//   formatDistanceStrict,
//   subMinutes,
// } from "date-fns";

// // ----------------------------------------------------------------------
// /**
//  * @description format Date to dd-MM-yyyy
//  * @param date
//  * @returns string
//  */
// export function fDate(date: string) {
//   return format(new Date(date), "dd-MM-yyyy");
// }

// export function fTime(datetime: string) {
//   return format(new Date(datetime), "hh:mm a");
// }
// /**
//  * @description format Date to dd MMM yyyy HH:mm
//  * @param date
//  * @returns string
//  */
// export function fDateTime(date: string) {
//   return format(new Date(date), "dd MMM yyyy HH:mm");
// }

// /**
//  * @description format Date to dd/MM/yyyy hh:mm p
//  * @param date
//  * @returns string
//  */
// export function fDateTimeSuffix(date: Date) {
//   return format(new Date(date), "dd/MM/yyyy hh:mm p");
// }

// /**
//  * @description relative DateTime from current time
//  * @param date
//  * @returns string
//  */
// export function fToNow(date: Date) {
//   return formatDistanceToNow(new Date(date), {
//     addSuffix: true,
//   });
// }

// /**
//  * @description get the difference between two date in minutes
//  * @param dateLeft
//  * @param dateRight
//  * @returns number
//  */
// export function fdifferenceInMinutes(dateLeft: string, dateRight: string) {
//   return differenceInMinutes(new Date(dateLeft), new Date(dateRight));
// }

// /**
//  *
//  * @param dateLeft
//  * @param dateRight
//  * @returns number in milliseconds
//  */
// export function fdifferenceInMilliseconds(dateLeft: string, dateRight: string) {
//   return differenceInMilliseconds(new Date(dateLeft), new Date(dateRight));
// }
// /**
//  *
//  * @param dateLeft
//  * @param dateRight
//  * @returns string relative time
//  */
// export function fformatRelative(dateLeft: string, dateRight: string) {
//   return formatRelative(new Date(dateLeft), new Date(dateRight));
// }

// /**
//  *
//  * @param dateLeft
//  * @param dateRight
//  * @returns string relative time
//  */
// export function fDistanceInHrsAndMinutes(dateLeft: string, dateRight: string) {
//   let time = "";
//   let dateEnd = new Date(dateLeft);
//   let dateStart = new Date(dateRight);
//   let hours = differenceInHours(dateEnd, dateStart);
//   if (hours > 0) {
//     time += `${hours} Hrs `;
//     dateStart = addHours(dateStart, hours);
//   }

//   let minutes = differenceInMinutes(dateEnd, dateStart);
//   if (minutes > 0) {
//     time += `${minutes} Min`;
//   }
//   return time;
// }

// /**
//  *
//  * @param dateLeft
//  * @param dateRight
//  * @returns string relative time
//  */
// export function fTimeDistanceInMinutes(dateLeft: string, dateRight: string) {
//   return formatDistanceStrict(new Date(dateLeft), new Date(dateRight), {
//     roundingMethod: "floor",
//     unit: "minute",
//   })
//     .replace(" hours", "")
//     .replace(" minutes", "");
// }
// export function fAddHours(date: string, amount: number) {
//   return addHours(new Date(date), amount).toString();
// }
// export function fMinutesToWords(add_minutes: number) {
//   let date_start = new Date();
//   let date_end = addMinutes(date_start, add_minutes);

//   return fDistanceInHrsAndMinutes(date_end.toString(), date_start.toString());
// }

// export function fSubMinutes(date: string, amount: number) {
//   return subMinutes(new Date(date), amount).toString();
// }
import {
  format,
  addHours,
  formatDistanceToNow,
  differenceInMinutes,
  differenceInHours,
  differenceInMilliseconds,
  formatRelative,
  addMinutes,
  formatDistanceStrict,
  subMinutes,
} from "date-fns";

// ----------------------------------------------------------------------
/**
 * @description format Date to dd-MM-yyyy
 * @param date
 * @returns string
 */
export function fDate(date: string) {
  return format(new Date(date), "dd-MM-yyyy");
}

export function fTime(datetime: string) {
  return format(new Date(datetime), "hh:mm a");
}
/**
 * @description format Date to dd MMM yyyy HH:mm
 * @param date
 * @returns string
 */
export function fDateTime(date: string) {
  return format(new Date(date), "dd MMM yyyy HH:mm");
}

/**
 * @description format Date to dd/MM/yyyy hh:mm p
 * @param date
 * @returns string
 */
export function fDateTimeSuffix(date: Date) {
  return format(new Date(date), "dd/MM/yyyy hh:mm p");
}

/**
 * @description relative DateTime from current time
 * @param date
 * @returns string
 */
export function fToNow(date: Date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

/**
 * @description get the difference between two date in minutes
 * @param dateLeft
 * @param dateRight
 * @returns number
 */
export function fdifferenceInMinutes(dateLeft: string, dateRight: string) {
  return differenceInMinutes(new Date(dateLeft), new Date(dateRight));
}

/**
 *
 * @param dateLeft
 * @param dateRight
 * @returns number in milliseconds
 */
export function fdifferenceInMilliseconds(dateLeft: string, dateRight: string) {
  return differenceInMilliseconds(new Date(dateLeft), new Date(dateRight));
}
/**
 *
 * @param dateLeft
 * @param dateRight
 * @returns string relative time
 */
export function fformatRelative(dateLeft: string, dateRight: string) {
  return formatRelative(new Date(dateLeft), new Date(dateRight));
}

/**
 *
 * @param dateLeft
 * @param dateRight
 * @returns string relative time
 */
export function fDistanceInHrsAndMinutes(dateLeft: string, dateRight: string) {
  let time = "";
  let dateEnd = new Date(dateLeft);
  let dateStart = new Date(dateRight);
  let hours = differenceInHours(dateEnd, dateStart);
  if (hours > 0) {
    time += `${hours} Hrs `;
    dateStart = addHours(dateStart, hours);
  }

  let minutes = differenceInMinutes(dateEnd, dateStart);
  if (minutes > 0) {
    time += `${minutes} Min`;
  }
  return time;
}

/**
 *
 * @param dateLeft
 * @param dateRight
 * @returns string relative time
 */
export function fTimeDistanceInMinutes(dateLeft: string, dateRight: string) {
  if (dateRight == null) {
    return "- ";
  }

  return formatDistanceStrict(new Date(dateLeft), new Date(dateRight), {
    roundingMethod: "floor",
    unit: "minute",
  })
    .replace(" hours", "")
    .replace(" minutes", "");
}
export function fAddHours(date: string, amount: number) {
  return addHours(new Date(date), amount).toString();
}
export function fMinutesToWords(add_minutes: number) {
  let date_start = new Date();
  let date_end = addMinutes(date_start, add_minutes);

  return fDistanceInHrsAndMinutes(date_end.toString(), date_start.toString());
}

export function fSubMinutes(date: string, amount: number) {
  return subMinutes(new Date(date), amount).toString();
}
