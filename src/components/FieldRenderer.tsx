import React from "react";
import { Grid, TextField, MenuItem, InputAdornment } from "@mui/material";
import { FieldConfig } from "./formTypes";
import { getValueFromPath } from "./conditions";
import { MyObject } from "../types";

type Props = {
  field: FieldConfig;
  myObject: MyObject;
  errors: Record<string, string>;
  handleChange: (
    path: string,
    transform?: (val: string) => string | number
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const FieldRenderer: React.FC<Props> = ({
  field,
  myObject,
  errors,
  handleChange
}) => {
  const { type, label, path, defaultValue } = field;
  const valueFromData = getValueFromPath(myObject, path);
  const value = valueFromData ?? defaultValue ?? "";

  const commonProps = {
    fullWidth: true,
    size: "small" as const,
    variant: "outlined" as const,
    error: Boolean(errors[path]),
    helperText: errors[path] || ""
  };

  switch (type) {
    case "textInput":
      return (
        <Grid item xs={12} key={path}>
          <TextField label={label} value={value} onChange={handleChange(path)} {...commonProps} />
        </Grid>
      );

    case "integerInput":
      return (
        <Grid item xs={12} sm={6} key={path}>
          <TextField
            label={label}
            type="number"
            inputProps={{ min: field.min, max: field.max }}
            value={value}
            onChange={handleChange(path, (v) => parseInt(v, 10))}
            {...commonProps}
          />
        </Grid>
      );

    case "enumInput":
      return (
        <Grid item xs={12} sm={6} key={path}>
          <TextField select label={label} value={value} onChange={handleChange(path)} {...commonProps}>
            {field.values?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      );

    case "currencyInput": {
      const currencyPath = `${path}.currency`;
      const valuePath = `${path}.value`;
      const currValue = getValueFromPath(myObject, valuePath) ?? "";
      const currCurrency =
        getValueFromPath(myObject, currencyPath) ?? field.currencies?.[0] ?? "";

      return (
        <Grid item xs={12} key={path}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                select
                label="Currency"
                value={currCurrency}
                onChange={handleChange(currencyPath)}
                {...commonProps}
                error={Boolean(errors[currencyPath])}
                helperText={errors[currencyPath] || ""}
              >
                {field.currencies?.map((curr) => (
                  <MenuItem key={curr} value={curr}>
                    {curr}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={8}>
              <TextField
                type="number"
                label={label}
                inputProps={{ min: field.min, max: field.max }}
                value={currValue}
                onChange={handleChange(valuePath, (v) => parseFloat(v))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {currCurrency}
                    </InputAdornment>
                  )
                }}
                {...commonProps}
                error={Boolean(errors[valuePath])}
                helperText={errors[valuePath] || ""}
              />
            </Grid>
          </Grid>
        </Grid>
      );
    }

    default:
      return null;
  }
};
