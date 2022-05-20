import prisma from "../utils/prisma";
import { addDays, format } from "date-fns";

export const getUserAttendance = async (userId: string, date: string) => {
  try {
    const user: any = await prisma.users.findUnique({
      where: { employee_id: userId },
      select: {
        doj: true,
      },
    });

    let attendance_start_date = new Date();
    attendance_start_date.setMonth(new Date(date).getMonth());
    attendance_start_date.setFullYear(new Date(date).getFullYear());
    attendance_start_date.setDate(new Date(user?.doj).getDate());
    attendance_start_date.setMinutes(0);
    attendance_start_date.setHours(0);
    let attendance_end_date = new Date(attendance_start_date);
    attendance_end_date.setMonth(attendance_end_date.getMonth() + 1);

    const emp_attendance = await prisma.attendance.findMany({
      where: {
        employee_id: userId,
        log_in: {
          gte: attendance_start_date,
          lte: attendance_end_date,
        },
      },
      include: {
        breaks: {
          select: {
            break_start: true,
            break_end: true,
          },
        },
      },
    });
    return emp_attendance;
  } catch (e) {
    console.error(e);
    throw Error("Error While Getting User Attendance");
  }
};
