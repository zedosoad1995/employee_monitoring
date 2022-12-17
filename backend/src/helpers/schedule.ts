import { Break, Subgroup } from "@prisma/client";

export const getTimesFromSubgroup = (
  subgroup: Subgroup & {
    Break: Break[];
  }
): string[] => {
  let schedule = subgroup.Break.reduce<string[]>((acc, el) => {
    acc = acc.concat([el.startTime, el.endTime]);
    return acc;
  }, []);

  schedule = schedule.concat([subgroup.startTime, subgroup.endTime]);

  schedule.sort();

  return schedule;
};
