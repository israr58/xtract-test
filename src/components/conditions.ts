import { FieldConfig } from "./formTypes";
import { MyObject } from "../types";

export const getValueFromPath = (
  obj: MyObject,
  path: string
): string | number | undefined => {
  return path.split(".").reduce((acc: unknown, key: string) => {
    if (typeof acc === "object" && acc !== null && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj) as string | number | undefined;
};

export const shouldRenderField = (
  field: FieldConfig,
  myObject: MyObject
): boolean => {
  const condition = field.condition;
  if (!condition) return true;

  const value = getValueFromPath(myObject, condition.path);

  if ("equals" in condition) return value === condition.equals;
  if ("notEquals" in condition) return value !== condition.notEquals;
  if ("in" in condition)
    return (
      value !== undefined &&
      Array.isArray(condition.in) &&
      condition.in.includes(value)
    );
  if ("greaterThan" in condition)
    return typeof value === "number" && value > condition.greaterThan;
  if ("lessThan" in condition)
    return typeof value === "number" && value < condition.lessThan;

  return true;
};
