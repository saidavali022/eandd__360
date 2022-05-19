import { Router } from "express";
import {
  updateTask,
  getUserTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
} from "../controllers/tasks.controller";
import upload from "../modules/fileupload";

const router = Router();

router.get("/:empId", getUserTasks);

router.post("/", upload.single("file"), createTask);
router.put("/:taskId", updateTask);
router.delete("/:Id", deleteTask);

router.put("/status/:taskId", updateTaskStatus);

export default router;
