import { PrismaClient, task_status } from "@prisma/client";
import { env } from "process";
const prisma = new PrismaClient();
const express = require("express");
const app = express();
export async function getTaskDetails(req: any, res: any) {
  //   res.statusCode === 200;
  const { Id } = req.params;
  const {
    title,
    description,
    team,
    priority,
    status,
    employee_id,
    start_date,
    end_date,
  } = req.body;
  try {
    const data = await prisma.task.upsert({
      where: {
        id: parseInt(req.params.Id),
      },
      update: {
        title,
        description,
        team,
        priority,
        employee_id,
        attachment: req.file?.filename || req.body.attachment,
        start_date: new Date(req.body.start_date),
        end_date: new Date(req.body.end_date),
      },
      create: {
        title,
        description,
        team,
        priority,
        employee_id,
        attachment: req.file?.filename || req.body.attachment,
        status: task_status.pending,
        start_date: new Date(req.body.start_date),
        end_date: new Date(req.body.end_date),
      },
    });
    res.status(200).json(data);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}

export const getUserTaskList = async (req: any, res: any) => {
  try {
    const data = await prisma.task.findMany({
      where: {
        employee_id: req.params.empId,
      },
    });
    res.status(200).json(data);
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
};

export const listTasks = async (req: any, res: any) => {
  try {
    const data = await prisma.task.findMany({
      where: {
        employee_id: req.params.empId,
      },
    });
    res.status(200).json(data);
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
};

export const deleteTask = async (req: any, res: any) => {
  try {
    const data = await prisma.task.delete({
      where: {
        id: parseInt(req.params.Id),
      },
    });
    res.status(200).json(data);
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
};

export const updateTaskStatus = async (req: any, res: any) => {
  try {
    const data = await prisma.task.update({
      where: {
        id: parseInt(req.params.Id),
      },
      data: { status: req.body.status },
    });
    res.status(200).json(data);
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
};
