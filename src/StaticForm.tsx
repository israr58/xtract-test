import React, { ChangeEventHandler, useState } from "react";
import Paper from "@mui/material/Paper";
import { Button, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { MyObject } from "./types";
import { setDeep } from "./utils";

type StaticFormProps = {
  object: MyObject;
};

const StaticForm = ({ object }: StaticFormProps): JSX.Element => {
  const [myObject, setMyObject] = useState<MyObject>(object);
  const [savedObject, setSavedObject] = useState<MyObject>();

  const onChange =
    (
      path: string,
    ): ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> =>
    (event) =>
      setMyObject(setDeep(myObject, path, event.target.value));

  const onSaveChanges = () => {
    setSavedObject(myObject);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper variant="elevation" style={{ margin: "10px" }}>
          <Typography variant="h4">Vehicle details</Typography>
          <Grid container alignItems="flex-start" spacing={2} padding={5}>
            <Grid item xs={12}>
              <TextField
                style={{ width: "100%" }}
                label="Driver Name"
                value={myObject.driver?.name || ""}
                onChange={onChange("driver.name")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{ width: "100%" }}
                label="Vehicle Regplate"
                value={myObject.vehicle?.regplate || ""}
                onChange={onChange("vehicle.regplate")}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div style={{ margin: "10px", padding: "10px" }}>
              <Button variant="outlined" onClick={onSaveChanges}>
                Save Changes
              </Button>
            </div>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper variant="elevation" style={{ margin: "10px" }}>
          <Typography variant="h5">Output</Typography>
          <div style={{ textAlign: "left" }}>
            <pre>{JSON.stringify(savedObject, null, 2)}</pre>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default StaticForm;
