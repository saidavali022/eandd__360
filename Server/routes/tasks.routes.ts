import { Router } from "express";
import {
  getTaskDetails,
  getUserTaskList,
  listTasks,
  deleteTask,
  updateTaskStatus,
} from "../controllers/tasks.controller";
import upload from "../modules/fileupload";

const router = Router();

router.get("/", listTasks);
router.put("/:Id", getTaskDetails);
router.post("/:Id", upload.single("file"), getTaskDetails);
router.get("/:empId", getUserTaskList);
router.put("/status/:Id", updateTaskStatus);
router.delete("/:Id", deleteTask);

export default router;
