import {
  fDate,
  fTime,
  fToNow,
  fformatRelative,
  fTimeDistanceInMinutes,
} from "@utils/formatTime";
import Label from "@components/Label";

export function colorStatusPriority(status: string) {
  if (status === "high") return "error";
  if (status === "medium") return "warning";
  if (status === "low") return "success";
}

export function colorStatusInvert(status: string) {
  if (status === "high") return "success";
  if (status === "medium") return "warning";
  if (status === "low") return "error";
}

interface IBreak {
  break_start: string;
  break_end: string;
}

export function renderBreakPills(breaks: IBreak[]) {
  const breaks_time = breaks.map((b: IBreak) =>
    fTimeDistanceInMinutes(b.break_start, b.break_end)
  );
  let total_break_time = 0;
  return breaks_time.map((b) => {
    total_break_time += parseInt(b);
    if (total_break_time > 60) {
      return (
        <Label variant="ghost" color="error">
          {b} Min
        </Label>
      );
    }
    return <Label variant="ghost"> {b} Min </Label>;
  });
}
