import * as React from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import UploadIcon from "@mui/icons-material/Upload";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";

export default function CustomizedTextField({
  name,
  value,
  label,
  handleTextChange,
}) {
  return (
    <Paper
      component="form"
      sx={{ p: "4px 4px", display: "flex", alignItems: "center", width: 600 }}
    >
      <EditIcon sx={{ p: "1px" }} />
      <TextField
        name={name}
        value={value}
        label={label}
        onChange={(event) => handleTextChange(event)}
        sx={{ width: 400, ml: 1, flex: 1 }}
        InputLabelProps={{ shrink: true }}
      />
      <IconButton type="submit" sx={{ p: "10px" }}>
        <UploadIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: "10px" }}>
        {name.includes("period") ? <CheckIcon /> : <CloudQueueIcon />}
      </IconButton>
    </Paper>
  );
}
