import Express, { Request, Response, NextFunction } from "express";
import prisma from "../utils/prisma";

interface TypedRequest extends Request {
  params: {
    empId: string;
  };
  query: {
    date: string;
    doj: string;
  };
}

export const getUserAttendance = async (req: TypedRequest, res: Response) => {
  const { empId } = req.params;
  let { date } = req.query;
  try {
    const user: any = await prisma.users.findUnique({
      where: { employee_id: empId },
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
        employee_id: empId,
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

    if (!emp_attendance) {
      res.status(500).json({ message: "empty" });
    }

    res.status(200).json(emp_attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
