import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    secondary: {
      main: "#69db7c",
      contrastText: "#fff",
    },
  },
});

const MultipleSelectInput = (props) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 3;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: "fit-content",
        width: 250,
      },
    },
  };
  return (
    <div className="form-row">
      <ThemeProvider theme={theme}>
        <FormControl sx={{ m: 0, width: "100%" }}>
          <label className="form-row-lable">{props.lable}</label>
          <Select
            sx={{
              backgroundColor: "white",
              borderRadius: "7px",
              marginTop: "1rem",
              fontSize: "1.4rem",
              lineHeight: "1",
              minHeight: "fit-content",
              height: "fit-content",
              padding: "0px 0px",
              boxSizing: "border-box",
            }}
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            className="form-row-select"
            multiple
            value={props.value}
            onChange={props.onChange}
            input={
              <OutlinedInput color="secondary" style={{ padding: "0px" }} />
            }
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {props.options.map((name) => (
              <MenuItem
                key={name}
                value={name.toLowerCase()}
                sx={{ fontSize: "1.4rem" }}
              >
                <Checkbox
                  checked={props.value.indexOf(name.toLowerCase()) > -1}
                />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ThemeProvider>
    </div>
  );
};

export default MultipleSelectInput;
