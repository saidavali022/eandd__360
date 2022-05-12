import { Router } from "express";
import {
  getTaskDetails,
  getDetailsById,
  getDetails,
  deleteDetailsById,
  updateTaskStatusByID,
} from "../controller/tasks.controller";
import upload from "../modules/fileupload";

const router = Router();

router.get("/", getDetails);
router.put("/:Id", getTaskDetails);
router.post("/:Id", upload.single("file"), getTaskDetails);
router.get("/:empId", getDetailsById);
router.put("/status/:Id", updateTaskStatusByID);
router.delete("/:Id", deleteDetailsById);

export default router;
