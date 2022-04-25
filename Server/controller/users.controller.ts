import Express, { Request, Response, NextFunction } from "express";
import * as usersService from "../services/users.service";

export const getUsers = async (req: Request, res: Response) => {
  const users = usersService.getAllUsers(req, res);
  res.status(200).json(users);
};

export const createUser = async (req: Request, res: Response) => {
  usersService.createUser(req, res);
};
