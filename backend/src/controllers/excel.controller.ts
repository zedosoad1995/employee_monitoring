import * as XLSX from "xlsx";
import { generateGroupExcel, uploadExcelToDB } from "../services/excel.service";
import { NextFunction, Request, Response } from "express";

export const getTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const workbook = await generateGroupExcel(req.params.id);

  const buffer = await XLSX.write(workbook, { type: "buffer" });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=template.xlsx");

  res.send(buffer);
};

export const uploadExcel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const fileContents = req.file;
  await uploadExcelToDB(fileContents);

  res.send({ success: true });
};
