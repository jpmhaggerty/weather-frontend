import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { red, green, yellow } from "@mui/material/colors";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import BoltIcon from "@mui/icons-material/Bolt";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const shortDefault = [
  { name: "LIG", status: false },
  { name: "SEF", status: false },
  { name: "CML", status: false },
  { name: "ATT", status: false },
  { name: "DET", status: false },
  { name: "DBR", status: false },
  { name: "DTB", status: false },
  { name: "THK", status: false },
  { name: "SMK", status: false },
  { name: "TRB", status: false },
];

export default function StatusConsole({
  shortRules = shortDefault,
  handleInfo,
}) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        m: 2,
      }}
    >
      {shortRules.map((element, index) => {
        return (
          <Chip
            key={index}
            label={element.name}
            sx={{
              bgcolor: element.status ? green[500] : red[900],
              color: element.status ? yellow[100] : yellow[500],
            }}
            icon={
              element.status ? (
                <RocketLaunchIcon sx={{ "&&": { color: "#FEFFFE" } }} />
              ) : (
                <BoltIcon sx={{ "&&": { color: "#FFFEFE" } }} />
              )
            }
            variant={"outlined"}
            clickable={false}
            deleteIcon={<InfoTwoToneIcon sx={{ "&&": { color: "#FEFEFF" } }} />}
            onDelete={(event) => handleInfo(element.name)}
          ></Chip>
        );
      })}
    </Box>
  );
}
