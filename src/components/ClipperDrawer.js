import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import BasicCard from "./BasicCard";
import StickyHeadTable from "./StickyHeadTable";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import StatusConsole from "./StatusConsole";
import Container from "@mui/material/Container";

const shortTemp = [
  { name: "LIG", status: false },
  { name: "SEF", status: true },
  { name: "CML", status: false },
  { name: "ATT", status: false },
  { name: "DET", status: false },
  { name: "DBR", status: false },
  { name: "DTB", status: false },
  { name: "THK", status: false },
  { name: "SMK", status: false },
  { name: "TRB", status: false },
];

export default function ClippedDrawer({ dataFeed, handleDataSwitch }) {
  let weatherForecast = dataFeed.map((element) => {
    return (
      <div>
        <BasicCard key={element.number} dataFeed={element} />
        <Divider />
      </div>
    );
  });

  const handleInfo = (tag) => {
    console.log("More info requested for", tag);
  };

  return (
    <div>
      <CssBaseline />
      <Box
        sx={{
          display: "inline-flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          m: 2,
        }}
      >
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Lightning Launch Commit Criteria
            </Typography>
            <StatusConsole shortRules={shortTemp} handleInfo={handleInfo} />
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="top"
                control={<Switch color="warning" />}
                label="Data Feed"
                labelPlacement="top"
                onChange={(event) => {
                  handleDataSwitch(event);
                }}
              />
            </FormGroup>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Container>
          {weatherForecast}
          <Toolbar />
        </Container>
        <Container>
          <Toolbar />
          <StickyHeadTable dataFeed={dataFeed} />
        </Container>
      </Box>
    </div>
  );
}
