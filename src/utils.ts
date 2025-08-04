import { assocPath } from "ramda";
import { MyObject } from "./types";
import objectJson from "./object.json";

export const setDeep = (
  obj: MyObject,
  path: string,
  value: string,
): MyObject => {
  return assocPath(path.split("."), value)(obj) as MyObject;
};

export const getData = () => {
  return objectJson as MyObject;
};
