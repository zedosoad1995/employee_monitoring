import { Router } from "express";
import timesheetsRoute from "./timesheets.route";
import employeesRoute from "./employees.route";
import groupsRoute from "./groups.route";
import subgroupsRoute from "./subgroups.route";
import workshiftRoute from "./workshift.route";
import excelRoute from "./excel.route";

const api = Router()
  .use("/timesheets", timesheetsRoute)
  .use("/employees", employeesRoute)
  .use("/groups", groupsRoute)
  .use("/subgroups", subgroupsRoute)
  .use("/workshifts", workshiftRoute)
  .use("/excel", excelRoute);

export default Router().use("/api", api);
