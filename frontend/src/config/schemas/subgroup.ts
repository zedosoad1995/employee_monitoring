import * as yup from "yup";
import { AnyObject } from "yup/lib/types";

function isStartTimeSmaller(
  this: yup.TestContext<AnyObject>,
  startTime?: string
) {
  const { endTime } = this.parent;
  if (!startTime) return false;
  return startTime < endTime;
}

function isEndTimeGreater(this: yup.TestContext<AnyObject>, endTime?: string) {
  const { startTime } = this.parent;
  if (!endTime) return false;
  return endTime > startTime;
}

export interface ISubgroupSchema {
  startTime?: string;
  endTime?: string;
  breaks: {
    startTime?: string;
    endTime?: string;
  }[];
}

export const SubgroupSchema = yup.object().shape({
  startTime: yup
    .string()
    .typeError("Invalid String")
    .required()
    .test("is-smaller", "Start Time should be smaller", isStartTimeSmaller),
  endTime: yup
    .string()
    .typeError("Invalid String")
    .required()
    .test("is-greater", "End Time should be greater", isEndTimeGreater),
  Break: yup.array().of(
    yup.object().shape({
      startTime: yup
        .string()
        .typeError("Invalid String")
        .required()
        .test(
          "is-smaller-break",
          "Start Time should be smaller",
          isStartTimeSmaller
        ),
      endTime: yup
        .string()
        .typeError("Invalid String")
        .required()
        .test(
          "is-greater-break",
          "End Time should be greater",
          isEndTimeGreater
        ),
    })
  ),
});
