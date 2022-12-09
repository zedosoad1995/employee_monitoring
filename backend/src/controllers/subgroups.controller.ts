import { Request, Response, NextFunction } from "express";
import * as SubgroupsService from "../services/subgroups.service";
import httpStatusCodes from "http-status-codes";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let resp;
  try {
    resp = await SubgroupsService.create(req.body);
  } catch (err) {
    return next(err);
  }

  res.status(httpStatusCodes.CREATED).json(resp);
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let resp;
  try {
    resp = await SubgroupsService.update(req.params.id, req.body);
  } catch (err) {
    console.log(err);
    return next(err);
  }

  res.status(httpStatusCodes.OK).json(resp);
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let resp;
  try {
    resp = await SubgroupsService.deleteOne(req.params.id);
  } catch (err) {
    return next(err);
  }

  res.status(httpStatusCodes.NO_CONTENT).json({});
};
