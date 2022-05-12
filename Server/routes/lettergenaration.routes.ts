import { Router } from "express";
import upload from "../modules/fileupload";
import {
  getLeaves,
  postLeaves,
  getLeavesByid,
  putLeaves,
  getComAdvSug,
  getComAdvSugById,
  postComAdvSug,
  getLetters,
  getLettersByempId,
  createLetters,
} from "../controller/lettergenaration.controller";
const router = Router();
router.get("/comadvsug", getComAdvSug);
router.get("/letters", getLetters);
router.get("/letters/:empId", getLettersByempId);
router.get("/comadvsug/:empId", getComAdvSugById);
router.post("/letters", upload.single("uploaded_file"), createLetters);
router.post("/comadvsug/", postComAdvSug);
// employee_complants_advices_suggestions
router.get("/", getLeaves);
router.get("/:empId", getLeavesByid);
router.post("/", postLeaves);
router.put("/:Id", putLeaves);

export default router;
