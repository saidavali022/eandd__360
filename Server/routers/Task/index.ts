const router = require("express").Router();
import upload from "../../modules/fileupload";
import * as task from "../../services/Task/index";

router.post("/create/:Id", upload, async (req: any, res: any) => {
  await task.default(req, res);
});

router.get("/get/:empId", async (req: any, res: any) => {
  await task.getDetailsById(req, res);
});

router.get("/get", async (req: any, res: any) => {
  await task.getDetails(req, res);
});

router.delete("/delete/:Id", async (req: any, res: any) => {
  await task.deleteDetailsById(req, res);
});

router.put("/update/:Id", async (req: any, res: any) => {
  await task.updateDetailsById(req, res);
});

export default router;
