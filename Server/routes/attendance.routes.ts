import { Router } from "express";
import { getUserAttendance } from "../controllers/attendance.controller";

const router = Router();

router.get("/:empId", getUserAttendance);

export default router;
