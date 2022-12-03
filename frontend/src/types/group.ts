import { ISubgroup } from "./subgroup";

export interface IGroup {
  id: string;
  name: string;
  isConstant: boolean;
  weekDays: {
    id: string;
    value: number;
  }[];
  subgroups: ISubgroup[];
}
