import Express, { Request, Response, NextFunction } from "express";
import * as AttendanceService from "../services/attendance.service";

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
    const emp_attendance: any = await AttendanceService.getUserAttendance(
      empId,
      date
    );

    if (!emp_attendance) {
      res.status(500).json({ message: "empty" });
    }

    res.status(200).json(emp_attendance);
    return;
  } catch (e) {
    console.error(e);
    res.status(400).json(e);
    return;
  }
};

export const;
