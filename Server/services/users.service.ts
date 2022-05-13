const express = require("express");
const app = express();
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { resolve } from "path/posix";
const prisma = new PrismaClient();
var SUCCESS = "Data Interted Successfully";
var FAILED = "Data Not Interted";

export async function getAllUsers(req: Request, res: any) {
  return await prisma.users.findMany({});
}

export async function getUsersById(req: Request, res: any) {
  return await prisma.users.findFirst({
    where: {
      employee_id: req.params.empId,
    },
  });
}

export async function createUser(req: any, res: any) {
  try {
    var data = await prisma.users.create({
      data: {
        profile_img: req.file.filename,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        dob: req.body.dob,
        gender: req.body.gender,
        country: req.body.country,
        city: req.body.city,
        zip_code: req.body.zip_code,
        sudo_name: req.body.sudo_name,
        blood_group: req.body.blood_group,
        marital_status: req.body.marital_status,
        department: req.body.department,
        designation: req.body.designation,
        doj: req.body.doj,
        employee_id: req.body.employee_id,
        password: req.body.password,
      },
    });
    // res.data = { data: data, status: 200, message: SUCCESS };
    return res.status(200).json({ data: data, status: 200, message: SUCCESS });
  } catch (error) {
    console.error(error);
    res.data = { data: { message: FAILED }, status: 300 };
    return;
  }

  // .then((data: any) => {
  //   return { data: data, status: 200, message: SUCCESS };
  // })
  // .catch((error: any) => {
  //   return { data: { message: FAILED }, status: 300 };
  // });
}
