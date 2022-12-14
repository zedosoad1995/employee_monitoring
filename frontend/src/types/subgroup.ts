import { SUBGROUP_TYPES } from "../constants";
import { IBreak } from "./break";

export interface ISubgroup {
  id: string;
  startTime: string;
  endTime: string;
  Break?: IBreak[];
}

export interface ISubgroupBody {
  id: string;
  startTime: string;
  endTime: string;
  breaks?: IBreak[];
}

type subgroupKeys = keyof typeof SUBGROUP_TYPES;
export type IsubgroupTypes = typeof SUBGROUP_TYPES[subgroupKeys];
