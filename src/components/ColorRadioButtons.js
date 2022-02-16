import * as React from "react";
import { red, green } from "@mui/material/colors";
import Radio from "@mui/material/Radio";

export default function ColorRadioButtons() {
  const handleChange = (event) => {
    event.target.value = !event.target.value;
    console.log("Event value: ", event.target.value)
  };

  const controlProps = () => ({
    onChange: handleChange,
    sx: {
      color: red[800],
      "&.Mui-checked": {
        color: green[600],
      },
    },
  });

  return (
    <div>
      <Radio {...controlProps()} />
      <Radio {...controlProps()} />
      <Radio {...controlProps()} />
      <Radio {...controlProps()} />
      <Radio {...controlProps()} />
    </div>
  );
}
