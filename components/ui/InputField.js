import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { Controller, useFormContext } from "react-hook-form";

const InputField = (props) => {
  const { control, defaultValue } = useFormContext();
  const [type, setType] = useState(props?.type);
  const { maxLength } = props;

  const handleClickShowPassword = () => {
    setType((prev) => (prev === "text" ? "password" : "text"));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Controller
      name={props?.name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          className={props.className}
          type={type}
          value={value}
          defaultValue={defaultValue}
          label={props?.label}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
          name={props?.email}
          placeholder={props.placeholder}
          InputProps={{
            ...props?.InputProps,
            endAdornment:
              props?.type === "password" ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {type === "password" ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ) : null,
          }}
          onInput={(e) => {
            maxLength
              ? (e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, maxLength))
              : "";
          }}
          {...props?.settings}
        >
          {props.children}
        </TextField>
      )}
    />
  );
};
export default InputField;
