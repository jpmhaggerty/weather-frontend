import * as React from "react";
import Chip from "@mui/material/Chip";
import { red, green, yellow } from "@mui/material/colors";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import BoltIcon from "@mui/icons-material/Bolt";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import Box from "@mui/material/Box";

const shortDefault = [
  { name: "LIG", fullName: "Lightning", status: false },
  { name: "SEF", fullName: "Surface Electric Field Mill", status: false },
  { name: "CML", fullName: "Cumulus Cloud", status: false },
  { name: "ATT", fullName: "Attached Cloud", status: false },
  { name: "DET", fullName: "Detached Cloud", status: false },
  { name: "DBR", fullName: "Debris Cloud", status: false },
  { name: "DTB", fullName: "Disturbed Cloud", status: false },
  { name: "THK", fullName: "Thick Cloud", status: false },
  { name: "SMK", fullName: "Smoke", status: false },
  { name: "TRB", fullName: "Triboelectricity", status: false },
];

export default function StatusConsole({
  ruleStatus = shortDefault,
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
      {ruleStatus.map((element, index) => {
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
