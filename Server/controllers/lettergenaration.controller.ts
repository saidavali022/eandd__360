import Express, { Request, Response, NextFunction } from "express";
import * as lettergenaration from "../services/lettergenaration.service";

export const getLeaves = async (req: Request, res: Response) => {
  lettergenaration
    .getLeaves(req, res)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.send(err));
};

export const getLetters = async (req: Request, res: Response) => {
  lettergenaration
    .getLetters(req, res)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.send(err));
};

export const getLettersByempId = async (req: Request, res: Response) => {
  lettergenaration
    .getLettersByempId(req, res)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.send(err));
};

export const getComAdvSug = async (req: Request, res: Response) => {
  lettergenaration
    .getComAdvSug(req, res)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.send(err));
};

export const postComAdvSug = async (req: Request, res: Response) => {
  lettergenaration
    .postComAdvSug(req, res)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.send(err));
};

export const getComAdvSugById = async (req: Request, res: Response) => {
  lettergenaration
    .getComAdvSugById(req, res)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.send(err));
};

export const getLeavesByid = async (req: Request, res: Response) => {
  lettergenaration
    .getLeavesByid(req, res)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.send(err));
};

export const postLeaves = async (req: Request, res: Response) => {
  lettergenaration
    .postLeaves(req, res)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.send(err));
};

export const createLetters = async (req: Request, res: Response) => {
  lettergenaration
    .createLetters(req, res)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.send(err));
};

export const putLeaves = async (req: Request, res: Response) => {
  lettergenaration
    .putLeaves(req, res)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.send(err));
};
