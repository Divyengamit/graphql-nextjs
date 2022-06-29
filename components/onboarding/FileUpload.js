import React, { useState } from "react";
import { Box, setRef, Typography } from "@mui/material";

import { FileUploader } from "react-drag-drop-files";

import { Controller, useFormContext } from "react-hook-form";

import FlexBox from "../ui/FlexBox";
import DropZone from "./DropZone";

const fileTypes = ["jpg", "png", "jpeg", "pdf"];

const FileUpload = (props) => {
  const { control, defaultValue, setError, clearErrors } = useFormContext();
  const [file, setFile] = useState();

  const handleChange = (file) => {
    clearErrors(props.name);
    setFile(file.name);
  };

  const errorHandler = (error) => {
    setFile();
    setError(props?.name, { type: "custom", message: error });
  };

  return (
    <Controller
      name={props?.name}
      control={control}
      render={({
        field: { onChange, value, setError },
        fieldState: { error },
      }) => (
        <Box>
          <FileUploader
            handleChange={(file) => {
              handleChange(file);
              onChange(file);
            }}
            onTypeError={errorHandler}
            onSizeError={errorHandler}
            name="file"
            types={fileTypes}
            multiple={false}
            maxSize={1.5}
          >
            <DropZone title={props?.title} />
          </FileUploader>

          <FlexBox>
            {file && (
              <Typography variant="body1Regular" color="primary.main">
                {`File Selected: ${file}`}
              </Typography>
            )}
            {error && (
              <Typography variant="body1Regular" color="error.main">
                {error?.message}
              </Typography>
            )}
          </FlexBox>
        </Box>
      )}
    />
  );
};

export default FileUpload;
