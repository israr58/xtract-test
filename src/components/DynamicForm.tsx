import React, { useState } from "react";
import { Container, Paper, Typography, Grid, Box, Button } from "@mui/material";
import { MyObject } from "../types";
import config from "../configurationToImplement.json";
import { mergeDefaultsWithData, setDeep } from "../utils";
import { FieldConfig, DynamicFormProps } from "./formTypes";
import { shouldRenderField } from "./conditions";
import { validateFormData } from "./validation";
import { FieldRenderer } from "./FieldRenderer";
import "../styles.css";

const DynamicForm: React.FC<DynamicFormProps> = ({ object }) => {
  const [myObject, setMyObject] = useState<MyObject>(
    mergeDefaultsWithData(object)
  );
  const [savedObject, setSavedObject] = useState<MyObject>();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange =
    (
      path: string,
      transform: (val: string) => string | number = (val) => val
    ) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = transform(event.target.value);
      setMyObject(setDeep(myObject, path, value));
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[path];
        return updated;
      });
    };
    const onSaveChanges = () => {
        const newErrors = validateFormData(config as FieldConfig[], myObject);
        setErrors(newErrors);
      
        if (Object.keys(newErrors).length === 0) {
          const visiblePaths = (config as FieldConfig[])
            .filter((field) => shouldRenderField(field, myObject))
            .map((field) => field.path);
      
          const cleanedData = deepFilter(myObject, visiblePaths);
          setSavedObject(cleanedData);
        }
      };
      
    const deepFilter = (data: MyObject, allowedPaths: string[]): MyObject => {
        const result: MyObject = {};
      
        allowedPaths.forEach((path) => {
          const keys = path.split(".");
          let src: unknown = data;
          let dest: Record<string, unknown> = result;
      
          keys.forEach((key, idx) => {
            if (idx === keys.length - 1) {
              if (typeof src === "object" && src !== null && key in (src as Record<string, unknown>)) {
                dest[key] = (src as Record<string, unknown>)[key];
              }
            } else {
              if (!dest[key]) {
                dest[key] = {};
              }
              dest = dest[key] as Record<string, unknown>;
              src = typeof src === "object" && src !== null ? (src as Record<string, unknown>)[key] : undefined;
            }
          });
        });
      
        return result;
      };
      

  return (
    <Container maxWidth="md" className="form-container">
      <Paper className="form-card" elevation={3}>
        <Typography variant="h4" align="center" gutterBottom>
          Dynamic Vehicle Form
        </Typography>
        <Grid container spacing={2}>
          {(config as FieldConfig[]).map((field) =>
            shouldRenderField(field, myObject) ? (
              <FieldRenderer
                key={field.path}
                field={field}
                myObject={myObject}
                errors={errors}
                handleChange={handleChange}
              />
            ) : null
          )}
        </Grid>
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onSaveChanges}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>

      <Paper className="output-card" elevation={2}>
        <Typography variant="h6" gutterBottom>
          Updated Output
        </Typography>
        <pre className="output-pre">{JSON.stringify(savedObject, null, 2)}</pre>
      </Paper>
    </Container>
  );
};

export default DynamicForm;
