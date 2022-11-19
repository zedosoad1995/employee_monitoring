export interface ICreateGroup {
  name: string;
  startTime: string;
  endTime: string;
  breaks: Array<{
    startTime: string;
    endTime: string;
  }>;
}

export interface IGetManyGroupInferred {
  id: string;
  name: string;
  isConstant: boolean;
  Employee: {
    id: string;
    name: string;
    cardId: string;
  }[];
  WeekDayWork: {
    id: string;
    value: number;
  }[];
  SubGroup?: {
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
