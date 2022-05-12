import Express, { Request, Response, NextFunction } from "express";
import * as usersService from "../services/users.service";

export const getUsers = async (req: Request, res: Response) => {
  usersService
    .getAllUsers(req, res)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
};

export const getUsersById = async (req: Request, res: Response) => {
  usersService
    .getUsersById(req, res)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
};

export const createUser = async (req: Request, res: Response) => {
  usersService.createUser(req, res);
};
