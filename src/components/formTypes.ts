import { MyObject } from "../types";

export type FieldCondition =
  | { path: string; equals: string | number }
  | { path: string; notEquals: string | number }
  | { path: string; in: Array<string | number> }
  | { path: string; greaterThan: number }
  | { path: string; lessThan: number };

export type FieldConfig = {
  type: "textInput" | "integerInput" | "enumInput" | "currencyInput";
  label: string;
  path: string;
  defaultValue?: string | number;
  min?: number;
  max?: number;
  values?: string[];
  currencies?: string[];
  required?: boolean;
  condition?: FieldCondition;
};

export type DynamicFormProps = {
  object: MyObject;
};
