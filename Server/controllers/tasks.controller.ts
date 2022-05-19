import { PrismaClient, task_status } from "@prisma/client";
import { env } from "process";

const prisma = new PrismaClient();
const express = require("express");
const app = express();

export async function getTaskDetails(req: any, res: any) {
  console.info("---");
  console.info("getTaskDetails");
  console.info("---");
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

export const createTask = async (req: any, res: any) => {
  console.info("---");
  console.info("getUserTasks");
  console.info("---");
  // TODO: only admin can create the task
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
    const task = await prisma.task.create({
      data: {
        title,
        description,
        team,
        priority,
        employee_id,
        status,
        attachment: req.file?.filename || req.body.attachment,
        start_date: new Date(req.body.start_date),
        end_date: new Date(req.body.end_date),
      },
    });
    res.status(201).json(task);
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
};

export const updateTask = async (req: any, res: any) => {
  console.info("---");
  console.info("getUserTasks");
  console.info("---");
  // TODO: only admin can create the task
  const { taskId } = req.params;
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
    const task = await prisma.task.update({
      where: {
        id: parseInt(taskId),
      },
      data: {
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
    res.status(201).json(task);
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
};

export const getUserTasks = async (req: any, res: any) => {
  console.info("---");
  console.info("getUserTasks");
  console.info("---");
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
  //TODO: only the user who had assigned/created the task can delete i.e, only if the task is not started/completed.
  console.info("---");
  console.info("deleteTask");
  console.info("---");
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
  //TODO: only the user to whom the task is assigned can update the task status other than admin who assigned the task.
  console.info("---");
  console.info("updateTaskStatus");
  console.info("---");
  const { taskId } = req.params;
  const { status } = req.body;
  try {
    const data = await prisma.task.update({
      where: {
        id: parseInt(taskId),
      },
      data: { status },
    });
    res.status(200).json(data);
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
};
