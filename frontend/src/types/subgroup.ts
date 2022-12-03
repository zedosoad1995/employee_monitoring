import { IBreak } from "./break";

export interface ISubgroup {
  id: string;
  startTime: string;
  endTime: string;
  Break?: IBreak[];
}
