export interface IGroup {
  id: string;
  name: string;
  isConstant: boolean;
  weekDays: {
    id: string;
    value: number;
  }[];
  subgroups: {
    id: string;
    startTime: string;
    endTime: string;
    Break: {
      id: string;
      startTime: string;
      endTime: string;
    }[];
  }[];
}
