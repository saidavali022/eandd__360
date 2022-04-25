const express = require("express");
const app = express();
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { resolve } from "path/posix";
const prisma = new PrismaClient();
var SUCCESS = "Data Interted Successfully";
var FAILED = "Data Not Interted";

export async function getAllUsers(req: Request, res: Response) {
  const allUsers = await prisma.users.findMany({});
  return allUsers;
}

export async function createUser(req: any, res: any) {
  var data = await prisma.users
    .create({
      data: {
        profile_img: req.file.filename,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        dob: req.body.dob,
        gender: req.body.gender,
        country: req.body.country,
        city: req.body.city,
        zipcode: req.body.zipcode,
        sudoName: req.body.sudoName,
        Blood_Group: req.body.Blood_Group,
        Marital_Status: req.body.Marital_Status,
        Department: req.body.Department,
        Designation: req.body.Designation,
        doj: req.body.doj,
        employee_id: req.body.employee_id,
        password: req.body.password,
      },
    })
    .then((data: any) => {
      res.data = { data: data, status: 200, message: SUCCESS };
    })
    .catch((error: any) => {
      res.data = { data: { message: FAILED }, status: 300 };
    });
}
