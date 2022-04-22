import { PrismaClient } from "@prisma/client";
import { env } from "process";
const prisma = new PrismaClient();
const express = require("express");
const app = express();
export default async function getTaskDetails(req: any, res: any) {
  //   res.statusCode === 200;
  await prisma.task
    .upsert({
      where: {
        id: parseInt(req.params.Id),
      },
      update: {
        title: req.body.title,
        description: req.body.description,
        attachment: req.file?.filename || req.body.attachment,
        team: req.body.team,
        employee_id: req.body.employee_id,
        start_date: new Date(req.body.start_date),
        end_date: new Date(req.body.end_date),
      },
      create: {
        title: req.body.title,
        description: req.body.description,
        attachment: req.file?.filename || req.body.attachment,
        team: req.body.team,
        status: "pendding",
        employee_id: req.body.employee_id,
        start_date: new Date(req.body.start_date),
        end_date: new Date(req.body.end_date),
      },
    })
    .then((data: any) => {
      res.statusCode = 200;
      res.send({ data, message: env.MESSAGE_SUCCESS });
    })
    .catch((error: any) => {
      res.statusCode = 300;
      res.send({ message: env.MESSAGE_FAILED });
    });
}

export const getDetailsById = async (req: any, res: any) => {
  await prisma.task
    .findMany({
      where: {
        employee_id: req.params.empId,
      },
    })
    .then((data: any) => {
      res.statusCode = 200;
      res.send({ data, message: env.MESSAGE_SUCCESS });
    })
    .catch((error: any) => {
      res.statusCode = 300;
      res.send({ message: env.MESSAGE_FAILED });
    });
};

export const getDetails = async (req: any, res: any) => {
  await prisma.task
    .findMany({
      where: {
        employee_id: req.params.empId,
      },
    })
    .then((data: any) => {
      res.statusCode = 200;
      res.send({ data, message: env.MESSAGE_SUCCESS });
    })
    .catch((error: any) => {
      res.statusCode = 300;
      res.send({ message: env.MESSAGE_FAILED });
    });
};

export const deleteDetailsById = async (req: any, res: any) => {
  // console.log(req.params);
  // var Id = parseInt(req.params.Id);
  // console.log(typeof Id);
  await prisma.task
    .delete({
      where: {
        id: parseInt(req.params.Id),
      },
    })
    .then((data: any) => {
      res.statusCode = 200;
      res.send({ data, message: env.MESSAGE_SUCCESS });
    })
    .catch((error: any) => {
      res.statusCode = 300;
      res.send({ message: env.MESSAGE_FAILED });
    });
};

export const updateDetailsById = async (req: any, res: any) => {
  // console.log(req.params);
  // var Id = parseInt(req.params.Id);
  // console.log(typeof Id);
  await prisma.task
    .update({
      where: {
        id: parseInt(req.params.Id),
      },
      data: { status: req.body.status },
    })
    .then((data: any) => {
      res.statusCode = 200;
      res.send({ data, message: env.MESSAGE_SUCCESS });
    })
    .catch((error: any) => {
      res.statusCode = 300;
      res.send({ message: env.MESSAGE_FAILED });
    });
};
