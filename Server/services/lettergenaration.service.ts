const express = require("express");
const app = express();
import { PrismaClient } from "@prisma/client";
import { Request, response, Response } from "express";
const prisma = new PrismaClient();
export const getLeaves = async (req: Request, res: Response) => {
  return await prisma.employee_leaves.findMany({});
};

export const getLetters = async (req: Request, res: Response) => {
  return await prisma.employee_letters.findMany({
    where: {
      letter_type: req.body.type,
    },
  });
};

export const getLettersByempId = async (req: Request, res: Response) => {
  return await prisma.employee_letters.findMany({
    where: {
      employee_id: req.params.empId,
    },
  });
};

export const createLetters = async (req: Request, res: Response) => {
  return await prisma.employee_letters.create({
    data: {
      employee_id: req.body.employee_id,
      letter_type: req.body.letter_type,
      letter: req.body.letter,
    },
  });
};

export const getComAdvSug = async (req: Request, res: Response) => {
  return await prisma.employee_complants_advices_suggestions.findMany({});
};

export const getComAdvSugById = async (req: Request, res: Response) => {
  return await prisma.employee_complants_advices_suggestions.findMany({
    where: {
      employee_id: req.params.empId,
    },
  });
};

export const postComAdvSug = async (req: Request, res: Response) => {
  return await prisma.employee_complants_advices_suggestions.create({
    data: {
      employee_id: req.body.employee_id,
      message: req.body.message,
      status: req.body.status || "pending",
      letter_type: req.body.letter_type,
    },
  });
};

export const getLeavesByid = async (req: Request, res: Response) => {
  return await prisma.employee_leaves.findMany({
    where: {
      employee_id: req.params.empId,
    },
  });
};

export const postLeaves = async (req: Request, res: Response) => {
  return await prisma.employee_leaves.create({
    data: {
      employee_id: req.body.employee_id,
      leave_status: "pending",
      leave_dates: String(req.body.leavesdates),
      reason: req.body.reason,
      permission_type: req.body.permission_type,
    },
  });
};

export const putLeaves = async (req: Request, res: Response) => {
  return await prisma.employee_leaves.update({
    where: {
      id: parseInt(req.params.Id),
    },
    data: {
      leave_status: req.body.leave_status,
    },
  });
};
