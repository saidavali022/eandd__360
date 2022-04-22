const express = require("express");
const app = express();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import DatabseConnection from "./database/connection";
// imports controller
import createUser from "./services/Users/index";
import taskManagemnt from "./routers/Task/index";
import upload from "./modules/fileupload";
var cors = require("cors");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.json());
// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req: any, file: any, cb: any) {
//     cb(null, "./uploads");
//   },
//   filename: function (req: any, file: any, cb: any) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

// const upload = multer({ storage: storage }).single("profile_img");

const port = process.env.PORT || 3001;
// Global databse connection
app.use(async (req: any, res: any, next: any) => {
  await DatabseConnection(req, res);
  if (res.db_status == 200) next();
  else res.send({ status: res.db_status });
});

app.post("/createuser", upload, async (req: any, res: any) => {
  await createUser(req, res);
  res.status(res.data.status);
  res.send(res.data);
});

app.get("/user", async (req: any, res: any) => {
  const allUsers = await prisma.users.findMany();
  res.send(allUsers);
});

app.get("/user/:empId", async (req: any, res: any) => {
  const data = await prisma.users.findMany({
    where: {
      employee_id: req.params.empId,
    },
  });
  res.status(200);
  res.send(data);
});

app.use("/task", taskManagemnt);

app.listen(port, "192.168.1.187", () => {
  console.log(`Example appdd listening on port ${port}`);
});
