import express from "express";
const app = express();
import router from "./routes";

import DatabseConnection from "./database/connection";
// imports controller
// import createUser from "./services/users.service";
// import taskManagemnt from "./routers/Task/index";
import upload from "./modules/fileupload";
import cors from "cors";

app.use(cors());

app.use(express.json());
app.use(router);

const port = process.env.PORT || 3001;
// Global databse connection
app.use(async (req: any, res: any, next: any) => {
  await DatabseConnection(req, res);
  if (res.db_status == 200) next();
  else res.send({ status: res.db_status });
});

// app.post("/createuser", upload, async (req: any, res: any) => {
//   await createUser(req, res);
//   res.status(res.data.status);
//   res.send(res.data);
// });

// app.get("/user", async (req: any, res: any) => {
//   const allUsers = await prisma.users.findMany();
//   res.send(allUsers);
// });

// app.get("/user/:empId", async (req: any, res: any) => {
//   const data = await prisma.users.findMany({
//     where: {
//       employee_id: req.params.empId,
//     },
//   });
//   res.status(200);
//   res.send(data);
// });

// app.get("/user/department/:departmentId", async (req: any, res: any) => {
//   const data = await prisma.users.findMany({
//     where: {
//       Department: req.params.departmentId,
//     },
//     select: {
//       employee_id: true,
//     },
//   });
//   res.status(200);
//   res.send(data);
// });

// app.get("/user/deps", async (req: any, res: any) => {
//   const data = await prisma.users.findMany({});
//   res.status(200).json(data);
//   console.log("hii");
// });

// app.use("/task", taskManagemnt);

app.listen(3001, () => {
  console.log(`Example appd listening on port ${port}`);
});
