import { FieldConfig } from "./formTypes";
import { MyObject } from "../types";
import { getValueFromPath } from "./conditions";

export const validateFormData = (
  config: FieldConfig[],
  myObject: MyObject
): Record<string, string> => {
  const errors: Record<string, string> = {};

  config.forEach((field) => {
    const value = getValueFromPath(myObject, field.path);

    if (field.required) {
      const isEmpty =
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "");

      if (isEmpty) {
        errors[field.path] = `${field.label} is required`;
        return;
      }
    }

    if (field.type === "integerInput" && typeof value === "number") {
      if (field.min !== undefined && value < field.min) {
        errors[field.path] = `${field.label} must be ≥ ${field.min}`;
        return;
      }
      if (field.max !== undefined && value > field.max) {
        errors[field.path] = `${field.label} must be ≤ ${field.max}`;
        return;
      }
    }
  });

  return errors;
};
