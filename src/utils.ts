import { assocPath, path } from "ramda";

import { MyObject } from "./types";
import objectJson from "./object.json";
import config from "./configurationToImplement.json";

export const setDeep = (
  obj: MyObject,
  path: string,
  value: string | number
): MyObject => {
  return assocPath(path.split("."), value)(obj) as MyObject;
};



export const getData = () => {
  return objectJson as MyObject;
};

// Merges in default values from config if missing in the object
export const mergeDefaultsWithData = (data: MyObject): MyObject => {
  let updated = { ...data };

  for (const field of config) {
    const pathParts = field.path.split(".");
    const existingValue = path(pathParts, updated);

    if ((existingValue === undefined || existingValue === null) && field.defaultValue !== undefined) {
      updated = assocPath(pathParts, field.defaultValue, updated) as MyObject;
    }
  }

  return updated;
};